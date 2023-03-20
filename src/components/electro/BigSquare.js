import React, { useEffect, useState,useRef } from "react";
import SmallSquare from "./SmallSquare";
import "./BigSquare.css";
import DropSquare from "./dropSquare";
import { NavLink } from 'react-router-dom';
import {
  useLocation,
} from "react-router";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


function BigSquare() {
  const location = useLocation();
  const [randomSquares, setRandmoSquares] = useState([]);
  const [randomSquares1, setRandmoSquares1] = useState([]);
  const squares = Array.from({ length: location.state.gameAttr.game_attr.length }, (_, i) => i);
  const [qindex, setQIndex]=useState(-1);
  const [aindex, setAIndex]=useState(-1);
  const previousQuestValue = useRef(-1);
  const previousAnsValue = useRef(-1);
  const [attempt,setAttempt]=useState(0);
  const correct=useRef(0);
  const [unAttempt,setunAttempt]=useState(location.state.gameAttr.game_attr.length);
  const [greenLight,setGreenLight]=useState(false);
  const [redLight,setRedLight]=useState(false);
  const [correctIndex,setCorrectIndex]=useState([]);
  useEffect(() => {
    setRandmoSquares(() => shuffle(squares))
    setRandmoSquares1(() => shuffle(squares))
  }, []);

  async function moveSquare(state,val) {
    
  if(state=="qindex")
  { 
    setQIndex(val);
    setGreenLight(false);
    setRedLight(false);
    previousQuestValue.current=val;
  }
  else 
  {
    setAIndex(val);
    setGreenLight(false);
    setRedLight(false);
    previousAnsValue.current=val;
  }
  if(previousAnsValue.current!=-1 && previousQuestValue.current!=-1 && (previousAnsValue.current===aindex || previousQuestValue.current===qindex))
  {
     if(previousAnsValue.current==previousQuestValue.current)
      {
        // console.log(correctIndex.includes(parseInt(previousAnsValue.current)))
        if(correctIndex.includes(parseInt(previousAnsValue.current)))
        {

        }
        else{
          // correct.current=correct.current+1;
          setunAttempt(unAttempt-1)
          correctIndex.push(parseInt(previousAnsValue.current));
        }
        // correct.current=correct.current+1;
        // setunAttempt(unAttempt-1)
        setGreenLight(true);
        // alert("correct");

      }
    else if(previousAnsValue.current!=previousQuestValue.current)
    {
      setRedLight(true);
      // alert("wrong");
    }
      
    previousQuestValue.current=-1;
    previousAnsValue.current=-1;
    setAttempt(attempt+1);
    // console.log(correctIndex);
  }
  }

  

  return (
    <>
     <div style={{ width: "40%", margin:" -20px auto 20px", textAlign: "right"}}>
      <div style={{ width: "40%", display: "inline-flex", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
        <label style={{textAlign: "center", width: "60%"}}>Selected language: </label>
        <span style={{width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}>{location.state.gameData[location.state.id].lang.lang_desc}</span>
        </div>
        </div>
    <div style={{    display: "flex",justifyContent: "space-evenly",maxWidth: "800px",alignItems: "center",width: "100%", margin: "0 auto 15px"}}>
        <div style={{ border: "1px solid rgba(87, 51, 41,0.8)", borderRadius: "11px"}}>
          <h6 style={{background: "rgb(87, 51, 41)", borderRadius: "9px 9px 0px 0px", color: "rgb(255, 255, 255)", textAlign: "center", padding: "4px 10px", margin: "0"}}>attempt</h6>
      <h3 style={{ margin: "0", lineHeight: "45px"}}>{attempt}</h3>
      </div>
      
      <div style={{ border: "1px solid rgba(87, 51, 41,0.8)", borderRadius: "11px"}}>
      <h6 style={{background: "rgb(87, 51, 41)", borderRadius: "9px 9px 0px 0px", color: "rgb(255, 255, 255)", textAlign: "center", padding: "4px 10px", margin: "0"}}>Unsolved</h6>
      <h3 style={{ margin: "0", lineHeight: "45px"}}>{unAttempt}</h3>
      </div>
      <div style={{border: "1px solid rgba(87, 51, 41,0.8)", borderRadius: "11px"}}>

      <h6 style={{background: "rgb(87, 51, 41)", borderRadius: "9px 9px 0px 0px", color: "rgb(255, 255, 255)", textAlign: "center", padding: "4px 10px", margin: "0"}}>Output</h6>
      <div style={{justifyContent: "space-around",display: "flex",height: "45px",alignItems: "center"}}>

        {
          greenLight ?
      <span style={{width: "20px", height: "20px", border: "1px solid rgba(0,0,0,0.4)",borderRadius: "50%", background: "linear-gradient(0deg, rgba(32,149,14,1) 0%, rgba(61,218,42,1) 71%, rgba(4,255,0,1) 100%)"}}></span>
        :
      <span style={{width: "20px", height: "20px", border: "1px solid rgba(0,0,0,0.4)",borderRadius: "50%", background: "rgba(152, 251, 152,.3)"}}>  </span>
        }
      {
        redLight ?
        <span style={{width: "20px", height: "20px", border: "1px solid rgba(0,0,0,0.4)",borderRadius: "50%", background: "linear-gradient(0deg, rgba(152,14,14,1) 0%, rgba(218,42,42,1) 71%, rgba(255,0,0,1) 100%)"}}></span>  
        :
       <span style={{width: "20px", height: "20px", border: "1px solid rgba(0,0,0,0.4)",borderRadius: "50%", background: "rgba(255, 0, 0,.2)"}}></span>
      }      
      </div>
      </div>

    </div>
    <div style={{display:'flex',justifyContent:'center',width:"1080px",margin:"0 auto",background: "rgb(85 50 40)"}}>
    <div className="elctroContainer">
      <div className="electroContainer-1-Sub">
      {randomSquares.map((e, i) => {
        return (
          <div key={e} className="Container-Sub" >
            <SmallSquare value={e} imgUrl={location.state.gameAttr.game_attr[e]} clickHandler={moveSquare}/>
          </div>
          
        );
      })}
      </div>
    </div>
    <div className="elctroContainer">
    <div className="electroContainer-1-Sub">
      {randomSquares1.map((e, i) => {
        return (
          <div key={e} className="Container-Sub" >
            <DropSquare value={e} imgUrl={location.state.gameAttr.game_attr[e]} clickHandler={moveSquare}/>
          </div>
          
        );
      })}
      </div>
    </div>
    
    </div>
    <div>
    <NavLink
                // ImplementCardBoard
              to="/activityBoard" state={{ eventIndex: location.state.eventID,id:location.state.id }}  >    
              <button className="buttonn"><span>Finish</span></button>
            </NavLink>
    
    </div>
    {/* {hasWon && <div>Puzzle solved 🧠 🎉</div>} */}
    </>
  );
}

export default BigSquare;
