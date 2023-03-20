import React from 'react';
import './SmallSquare.css';

function SmallSquare(props) {
    const tileStyle = {
        width: '100%',
        height: '100%',
        transiion:'2s ease',    
      };
      function allowDrop(ev) {
        ev.preventDefault();
    }
    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(ev.target);
        ev.target.appendChild(document.getElementById(data));
    }
    
    return (
        
        <div id={'EmptySquare'+props.value} style={{...tileStyle}}  onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
        </div>
    )
}

export default SmallSquare;