// import React, { Component } from 'react';
// import originalImage from '../resources/assets/test.jpg';
// import 'jquery-ui-dist/jquery-ui';
// import '../screens/dragNdropPuzzle.css';
// class Jigsaw extends Component {


//  allowDrop(ev) {
//   ev.preventDefault();
// }

// drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }

//   render() {
//     return (
//      <div>
//       <div id="images">
//         <div id="drag4" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag5" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag6" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag7" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag8" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag9" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag10" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag11" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//         <div id="drag12" draggable="true" onDragStart={(event)=>this.drag(event)}></div>
//       </div>
//       <div id="text">
//         <div id="div1" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div2" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div3" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div4" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div5" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div6" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div7" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div8" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//         <div id="div9" onDrop={(event)=>this.drop(event)} onDragOver={(event)=>this.allowDrop(event)}></div>
//       </div>
//       <div className="info"><p>Congratulations if you finished!</p></div>
//       </div>
//     );
//   }

// }


// export default Jigsaw;

