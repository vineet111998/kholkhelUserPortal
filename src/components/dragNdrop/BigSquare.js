import React, { useEffect, useState } from "react";
import SmallSquare from "./SmallSquare";
import "./BigSquare.css";
import DropSquare from "./dropSquare";
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  useLocation,
} from "react-router";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const squares = Array.from({ length: 16 }, (_, i) => i);

function BigSquare() {
  const location = useLocation();
  const [randomSquares, setRandmoSquares] = useState([]);
  useEffect(() => {
    
    setRandmoSquares(() => shuffle(squares))
  }, []);

  function moveSquare(val) {
    let zeroIndex = randomSquares.indexOf(0);
    let valIndex = randomSquares.indexOf(val);

    if (valIndex + 4 === zeroIndex || valIndex - 4 === zeroIndex) {
        swap(valIndex, zeroIndex);
    } else if (valIndex + 1 === zeroIndex && zeroIndex % 4 !== 0 ) {
        swap(valIndex, zeroIndex);
    } else if (valIndex - 1 === zeroIndex && (zeroIndex + 1) % 4 !== 0) {
        swap(valIndex, zeroIndex)
    }
  }

  function swap(valIndex, zeroIndex) {
    let temArray = [...randomSquares]
    temArray[zeroIndex] = randomSquares[valIndex];
    temArray[valIndex] = 0;
    setRandmoSquares(() => [...temArray])
  }
 function isSolved(tiles) {
    for (let i = 0, l = tiles.length; i < l; i++) {
      if (tiles[i] !== i) {
        return false;
      }
    }
    return true;
    
  }

  const hasWon =isSolved(randomSquares)
  return (
    <>
    <div style={{display:'flex',justifyContent:'center',width:"1080px",margin:"0 auto",background: "rgb(85 50 40)"}}>
    <div className="Container 1">
      {squares.map((e, i) => {
        return (
          <div key={e} className="Container-Sub" >
            <SmallSquare value={e} imgUrl={location.state.gameAttr.game_attr[0]} clickHandler={moveSquare}/>
          </div>
          
        );
      })}
    </div>
    <div className="Container 2">
      {squares.map((e, i) => {
        return (
          <div key={e} className="Container-Sub" >
            <DropSquare value={e}  clickHandler={moveSquare}/>
          </div>
          
        );
      })}
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
