import React, { Component } from "react";
import { NavLink ,useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import { Modal, Button } from 'react-bootstrap'
import { IP } from '../connection';
class MultiLingual extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
    }
    state={
        status:0,
        artifact:"",
        artifact_status:false,
        langData:[]
 //pluck a random color
    }
  
  async handleClick(e) {
    var gameData = await JSON.parse(localStorage.getItem('events'));
    gameData[this.props.eventID][0].tile_game_info[this.props.activeID].multiGameData[e.target.id].selected=true;
    localStorage.setItem("events",JSON.stringify(gameData));
}
async exitHandler(){
  var gameData = await JSON.parse(localStorage.getItem('events'));
  var currentArtifacts=localStorage.getItem('artifactList');
  var date = new Date();
  gameData[this.props.eventID][0].tile_game_info[this.props.activeID].game_status=1;
  localStorage.setItem("events",JSON.stringify(gameData));
  console.log(gameData[this.props.eventID][0].hasOwnProperty('tile_artifact_info'));
  if(gameData[this.props.eventID][0].hasOwnProperty('tile_artifact_info'))
  {
  var artifact_url = gameData[this.props.eventID][0].tile_artifact_info.artifact_prev;
  var artifact_name=gameData[this.props.eventID][0].tile_artifact_info.artifact_name;
  var artifactInfo={artifact_type:1,artifact_url:artifact_url,artifact_name:artifact_name,eventName:gameData[this.props.eventID][0].tile_desc,date:date}
  if(currentArtifacts==null)
  {
      var setArtifact=[];
      setArtifact.push(artifactInfo);
      localStorage.setItem("artifactList",JSON.stringify(setArtifact));
  }
    else 
    {
      currentArtifacts=JSON.parse(currentArtifacts);
      currentArtifacts.push(artifactInfo);
      localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    }
  this.setState(({
    artifact:artifact_url,
    artifact_status:true
  }));
  
}
else{
  window.location.reload(false);
}

}

changeHandler2 = () => {
  this.setState(({
    artifact_status:false
  }));
  // window.location.reload(false);
}

// componentDidMount=()=>
// {
//   if(langData)
//   console.log("asdasdsa")
// }

  render() {
    // this.props.gameAttr.map((data,i) =>
    // {
      console.log(this.props)
    //   console.log(Object.keys(data.game).length)
    // })
  return (
    <>
    {
     <div style={{    textAlign: "center",justifyContent: "center",maxWidth: "1200px",margin: "0 auto"}}>
     <h1>Select a language:</h1>
     <div style={{ width: "50%", margin: "2% auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {
            this.props.gameAttr.map((data,i) =>
              <div style={{ flex: "0 0 33.3333333%", margin: "2% auto" }} key={i}>
               {
                data.game.game_type_id == 8 ?
                data.selected != true ?  
                (
                <NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                to="/electro" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                   <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                    </NavLink>)
                    :
                    <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                     :
               data.game.game_type_id == 7 ?
               data.selected != true ?  
               (
               <NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
               to="/scramble" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                  <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                   </NavLink>)
                   :
                   <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                    :
                    data.game.game_type_id == 3 ?
                            data.selected != true ?  
                            (
                            <NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                            to="/quiz" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                               <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                </NavLink>)
                                :
                                <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                 :
                                 data.game.game_type_id == 6 ?
                            data.selected != true ?  
                            (
                            <NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                            to="/puzzle" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                               <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                </NavLink>)
                                :
                                <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                 :
                            data.game.game_type_id == 1 ?
                            data.selected != true ? 
                            (<NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                            to="/picturePuzzle" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                               <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                </NavLink>)
                                :
                                <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                 :
                                data.game.game_type_id == 4 ?
                                data.selected != true ?  
                            (<NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                            to="/hangman" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                               <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                </NavLink>)
                                :
                                <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                 :
                                data.game.game_type_id == 2 ?
                                data.selected != true ?  
                                (<NavLink id={i} onClick={(e)=>this.handleClick(e)} style={{textDecoration: 'none'}}
                                to="/wordgame" state={{gameAttr:data.game,activeID:this.props.activeID,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}>
                                   <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected==true ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                    </NavLink>)
                                    :
                                    <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: data.selected?"default":"pointer" }} >{data.lang.lang_desc}</Card>
                                     :
                                <Card  id={i} style={{ textTransform:"capitalize",width:"140px",height:"60px",textAlign:"center",alignItems:"center",display: "inline-grid", backgroundColor: data.selected == true|| Object.keys(data.game).length == 0  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color, cursor: "default" }} >{data.lang.lang_desc}</Card>
                                }
              </div>
            )
          }
        </div>
       
        <button onClick={(e)=>this.exitHandler(e)} style={{ width: "8%",padding: "1% 0px",border: "2px solid rgb(87 51 41)",color:"rgb(87 51 41)",borderRadius: "10px",margin: "2% 0px 0px",background:"transparent" }}>Exit</button>
                          
        <div>
                {
                    this.state.artifact_status === true &&
                    // <h1>hello</h1>
                    <Modal
                        show={this.state.artifact_status}
                        onHide={this.changeHandler2}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Artifact Collection
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <h3>New Artifact to your collection</h3>
                                <img src={IP+"getImage/?imgName=" +this.state.artifact} style={{ width: "400px" }}></img>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <NavLink style={{textDecoration: 'none'}}
                            to="/" >
                            <Button onClick={this.changeHandler2}>Close</Button>
                            </NavLink>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        </div>
        
   }
    </>
  )
  }
}
export default MultiLingual;
