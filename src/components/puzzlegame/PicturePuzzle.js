import React, { useState, useEffect } from "react";
import Board from "./Board";
import { updateURLParameter } from "./helpers";
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PuzzleSolution from './puzzleSolution'
import {IP} from '../../connection';
import './picture.css';
import {
  useLocation,
} from "react-router";
function PicturePuzzle(props) {
  const location = useLocation();
  const [imgUrl, setImgUrl] = useState(IP+"getImage/?imgName=" + location.state.gameAttr.game_attr[0])
  console.log(location.state);
  // console.log(imgUrl);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has("img")) {
      setImgUrl(urlParams.get("img"))
    }
  }, [])

  const handleImageChange = (e) => {
    setImgUrl(e.target.value)
    window.history.replaceState("", "", updateURLParameter(window.location.href, "img", e.target.value))
  }
  const [active, setActive] = useState(false);
  function solutionHandler(data) {
    setActive(true)
    if (data === false) {
      setActive(false)
    }
  }

  return (
    <div>
      <div style={{ width: "40%", margin:" -20px auto 20px", textAlign: "right"}}>
      <div style={{ width: "40%", display: "inline-flex", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
        <label style={{textAlign: "center", width: "60%"}}>Selected language: </label>
        <span style={{width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}>{location.state.gameData[location.state.id].lang.lang_desc}</span>
        </div>
        </div>
      <div className="game">
        
        {!active &&
          <div>
            <Board imgUrl={imgUrl} />
            {
                location.state.eventType==1 &&
                <button onClick={solutionHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>SUBMIT</button>
              }
              {
                location.state.eventType==2 &&
                <NavLink
                // ImplementCardBoard
              to="/activityBoard" state={{ eventIndex: location.state.eventID,id:location.state.id }}  >    
              <Button variant="primary">Next</Button>
            </NavLink>
              }
            
          </div>
        }
      </div>
      {
        active &&
        <PuzzleSolution data={solutionHandler} value={location.state} />
      }
    </div>
  );
}

export default PicturePuzzle;
