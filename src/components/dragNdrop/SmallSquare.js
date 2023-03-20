import React from 'react';
import './SmallSquare.css';
// import imgUrl from './u1.jpg'
import {IP} from '../../connection';
function SmallSquare(props) {
    console.log(props.value);
    const [imgUrl, setImgUrl] = React.useState(IP+"getImage/?imgName=" + props.imgUrl)
    const tileStyle = {
        width: '100%',
        height: '100%',
        transiion:'2s ease',
        // translateX: visualPos.x,
        // translateY: visualPos.y,
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: `${500}px`,//x and y are nedded to the background  image size 
        // backgroundSize:'cover',
        // backgroundPosition: `${(133 / 4) * (props.value % 4)}% ${(133 / 4) * (Math.floor(props.value / 4))}%`,
        backgroundPosition: `${(500 / 4) * (props.value % 4)}px ${(500 / 4) * (Math.floor(props.value / 4))}px`,
    
      };
      console.log(tileStyle)
      function drag(ev) {
        // console.log(ev.target)
        ev.dataTransfer.setData("text", ev.target.id);
    }
    return (
        
        <div id={'FillSquare'+props.value} style={{...tileStyle}} draggable="true" onDragStart={(event)=>drag(event)}>
        </div>
    )
}

export default SmallSquare;