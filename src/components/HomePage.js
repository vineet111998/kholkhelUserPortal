import "./HomePage.css";
import { useState,useEffect } from "react";
import Slider from "react-slick";
import { Button } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function App(props) {
  // console.log(props.value);
  const [gameAttr, setgameAttr] = useState([]);
  const[gameData,setgameData]=useState([]);
  const [eventID,seteventID]=useState(-1);
  const [activeID,setactiveID]=useState(-1);
  const [gameType,setgameType]=useState(-1);
  const [eventType,seteventType]=useState(-1);
  const [id,setID]=useState(-1);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect( ()=>{
    console.log(123123213)
    if(props.value[imageIndex]!=undefined)
    {
      if(props.value[imageIndex][0].event_type_id==2)
      {
          for(let i=0;i<props.value[imageIndex].length;i++)
          {
            for(let j=0;j<props.value[imageIndex][i].tile_game_info.length;j++)
            {
              let date= new Date();
              var getDate=new Date(props.value[imageIndex][i].tile_game_info[j].forDate);
              if(getDate.getDate()==date.getDate())
              {
                setactiveID(j);
                console.log(props.value[imageIndex][i].tile_game_info[j].game_status);
                if(props.value[imageIndex][i].tile_game_info[j].game_status==1)
                {
                  setgameType(-1);
                }
                else
                {
                 
                  var userid= JSON.parse(localStorage.getItem('userID'));
                  var userLang=userid.lang_id;
                  for(let k=0;k<props.value[imageIndex][0].tile_game_info[j].multiGameData.length;k++)
                  {
                    // console.log(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].selected)
                    if(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].lang.lang_id==userLang &&props.value[imageIndex][0].tile_game_info[j].multiGameData[k].selected!=true )
                    {
                      console.log("helloasdasdasdasd1212121");
                      if(Object.keys(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game).length !=0)
                      // // console.log("hello");
                      {
                      setgameType(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game.game_type_id);
                      setgameAttr(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game);
                      setID(k);
                      seteventID(imageIndex);
                      seteventType(2);
                      // console.log(props.value[imageIndex][0].tile_game_info[j].multiGameData)
                      setgameData(props.value[imageIndex][0].tile_game_info[j].multiGameData);
                      break;
                      }
                      else{
                        setgameType(-1);
                      }
                    }
                    else{
                      setgameType(-1);
                    }
                  }
                  
                  
                }
                
                
              }
              
            }
            
          }
    }
    }
  })
  const NextArrow = ({ onClick }) => {
       return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {

    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

 

  const checkSessiosStatus=async (e)=>{
    console.log("eventID")
    if(eventID!=-1)
    {
    var gameData = await JSON.parse(localStorage.getItem('events'));
    gameData[eventID][0].tile_game_info[activeID].multiGameData[id].selected=true;
    localStorage.setItem("events",JSON.stringify(gameData));
    }
  }

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
  return (
    <div className="App1">
      <Slider {...settings}>
        {
        props.value.map((img, idx) => (
          <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
             <Card style={{width:"50%",height:"250px",textAlign:"center",margin:"0 auto"}}>
                <Card.Body>
                <Card.Title>{img[0].tile_desc}</Card.Title>
                <Card.Text>
                    <br></br>
                    Start Date {gameType}: {img[0].tile_start_date}
                    <br></br>
                    End Date: {img[0].tile_end_date}
                </Card.Text>
                {img[0].event_type_id==1 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/activityBoard" state={{ eventIndex: idx }}  >    
                  <Button id="111" onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                  </NavLink>
                }
                {img[0].event_type_id==2 && gameType==-1 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/activityBoard" state={{ eventIndex: idx }}  >    
                  <Button id="111" onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                  </NavLink>
                }
                {img[0].event_type_id==2 && gameType==3 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/quiz" state={{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}  >    
                  <Button id="111" onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                  </NavLink>
                }
                {img[0].event_type_id==2 && gameType==2 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/wordgame" state={{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}  >    
                  <Button id="111" value={idx} onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                  </NavLink>
                }
                {img[0].event_type_id==2 && gameType==1 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/picturePuzzle" state={{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}  >    
                  <Button id="111" onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                   </NavLink>
                }
                {img[0].event_type_id==2 && gameType==4 &&
                  <NavLink
                  // ImplementCardBoard
                  to="/hangman" state={{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}  >    
                  <Button id="111" onClick={(e)=>checkSessiosStatus(e)}> Play</Button>
                   </NavLink>
                }
                </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default App;