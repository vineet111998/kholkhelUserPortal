import React, { useEffect, useState } from "react";
import GetEventRecords from "../Services/getEventRecords";
import HomePage from "../components/HomePage";
import {useNavigate} from 'react-router-dom'
import './Home.css'
const Home = () => {
  const [gameData, setGameData] = useState([]);
  const [userType,setUserType] =useState(-1);
  const history =useNavigate();
  useEffect(() => {
    if (gameData.length == 0) { getTileData() };
    if(userType==-1) getLoginStatus();

  },[]);

  async function checkLoginStatus()
  {
    const ciphertext = localStorage.getItem('userID');
    return ciphertext;
  }

  async function getLoginStatus(){
  var userData= await checkLoginStatus();
  if(userData == null)
  {
      history('/login');
  }
  else
  {
    userData=JSON.parse(userData);
    // console.log(userData);
    setUserType(userData.lang_id);
  }
}

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  function eventStatusArray(data) {
    const statusData = [];
    for (let i = 0; i < data.length; i++) {
      var gameData = [];
      if(data[i].event_type_id==1){
      for (let j = 0; j < data[i].tile_game_info.length; j++) {
        gameData.push({ game_name: data[i].tile_game_info[j].game_name, game_artifact: data[i].tile_game_info[j].game_artifact, game_type: data[i].tile_game_info[j].game_type, game_type_id: data[i].tile_game_info[j].game_type_id, game_attr: data[i].tile_game_info[j].game_attr, game_answer_status: data[i].tile_game_info[j].game_answer_status, game_status: 0 });
      }
      statusData.push([{ tile_desc: data[i].tile_desc, tile_end_date: convert(data[i].tile_end_date), tile_artifact_info: data[i].tile_artifact_info, tile_start_date: convert(data[i].tile_start_date), tile_type: data[i].tile_type, tile_id: data[i].tile_id,event_type_id: data[i].event_type_id,tile_game_info: gameData }])
      }
      else if(data[i].event_type_id==2){
        var newGameData={};
        for (let j = 0; j < data[i].tile_gameData.length; j++) {
          var arr=[];
          for(let k=0;k<data[i].tile_gameData[j].multiGameData.length;k++)
        {
          newGameData={lang:data[i].tile_gameData[j].multiGameData[k][0],game:data[i].tile_gameData[j].multiGameData[k][1],selected:false};
          arr.push(newGameData);
        }
          gameData.push({forDate:data[i].tile_gameData[j].forDate, multiGameData:arr,game_status:0});
        }
        statusData.push([{ tile_desc: data[i].tile_desc, tile_end_date: convert(data[i].tile_end_date), tile_artifact_info: data[i].tile_artifact_info, tile_start_date: convert(data[i].tile_start_date), tile_id: data[i].tile_id,event_type_id: data[i].event_type_id,tile_game_info: gameData }])
      }
    }
    return statusData;
  }
  async function getTileData() {
    const eventData = JSON.parse(localStorage.getItem('events'));
    const recordedEvent = localStorage.getItem('eventsUpdatedRecord');
    const recordedDate=new Date(recordedEvent);
    const todayDate=new Date();
    var dateDiff;
    if(recordedEvent!= null){
      dateDiff=Math.abs(todayDate.getDate()-recordedDate.getDate());
    }
    if (eventData != null && dateDiff <= 0 && eventData.length !=0) {
          setGameData(eventData);
    }
    else {
      await GetEventRecords.getInstance().getRecords().then((json)=>{
          var resultData = eventStatusArray(json);
          setGameData(resultData);
          localStorage.setItem("events", JSON.stringify(resultData));
          
          localStorage.setItem("eventsUpdatedRecord", todayDate);
        })
    }
  }

  return (
    <>
      <HomePage value={gameData} />
    </>)
}

export default Home;