import { Grid } from '@mui/material';
import { render } from '@testing-library/react';
import {useEffect, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../screens/puzzle.css';

export default function App() {
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [size, setSize] = useState(100);
  const [row, setRow] =useState(4);
  const [col, setCol] = useState(4);
  var [matrix, setMatrix] = useState("");

function setMatrixData() {
  for(let i = 0; i < row; i++) {
    matrix += "<div class='row'>";
    for(let j = 0; j < col; j++) {
      matrix += "<div class='col-3' style='height:100px;width:100px;border:1px solid black'></div>";
    }
    matrix += "</div>";
  }
// console.log(matrix);
}

function position(e)
  {
    console.log("X:"+Math.floor((e.clientX - e.target.offsetLeft)/102));
    console.log("Y:"+Math.floor((e.clientY - e.target.offsetTop)/102));
  }
  
  render(
    matrix.length==0 && setMatrixData()
);
  return (
        <div id="puzzle" onClick={(e)=>position(e)} dangerouslySetInnerHTML={{__html:matrix}}></div>
  );
}
