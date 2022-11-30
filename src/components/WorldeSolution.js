import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import {IP} from '../connection'
function WordleSolution(props) {
    const [artifactStatus, setArtifactStatus] = useState(false)
    const [artifact, setArtifact] = useState("")
    // console.log(props);
    // const changeHandler = () => {
    //     setActive(false)
    //     props.data(false)
    // }
    const eventStatusArray = (artifact) => {
        artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_status = 1;
        var currentArtifacts=localStorage.getItem('artifactList');
        var date = new Date;
        if(!artifact[props.value.eventID][0].tile_game_info[props.value.gameID].hasOwnProperty('game_artifact'))
        {
            return artifact
        }
        else{
        var artifact_url = artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_artifact.artifact_prev;
        var artifact_name=artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_artifact.artifact_name
        var artifactInfo={artifact_type:0,artifact_url:artifact_url,artifact_name:artifact_name,activityName:artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_name,eventName:artifact[props.value.eventID][0].tile_desc,date:date}
        if(currentArtifacts==null)
        {
            currentArtifacts=[];
            currentArtifacts.push(artifactInfo);
            localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
        }
        else
        {
            currentArtifacts=JSON.parse(currentArtifacts);
            for(let i=0;i<currentArtifacts.length;i++)
            {
                if(currentArtifacts[i].activityName===artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_name) return artifact
            }
            currentArtifacts.push(artifactInfo);
            localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
        }
        // console.log(artifactInfo);
        return artifact;
    }
}

    const storagehandler = () => {
        var eventData = JSON.parse(localStorage.getItem('events'));
        console.log(eventData);
        const newEventsData = eventStatusArray(eventData);
        localStorage.setItem("events", JSON.stringify(newEventsData));
        
    }
    const artifactHandler = () => {
        var artifact = JSON.parse(localStorage.getItem('events'));
        var artifact_url = artifact[props.value.eventID][0].tile_game_info[props.value.gameID].game_artifact.artifact_prev;
        setArtifact(artifact_url);
        setArtifactStatus(true);
    }
    const changeHandler2 = () => {
        setArtifactStatus(false)
        // console.log(this.state.active)
    }
    return (
        <div>
            {/* <h1>Game Over. Final score is {this.state.score} points</h1> */}
            <div style={{ width: "40%", margin: "0 auto", padding: "1%", borderRadius: "15px", border: "2px solid rgba(0,0,0,0.2)" }}>
                <h4>Activity Outcome</h4>
                <div style={{ backgroundColor: "aliceblue", height: "100px", borderRadius: "10px" }}>
                    <p>{props.value.outcome.outcome_desc}</p>
                </div>
            </div>
            <button onClick={artifactHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Collect Artifact</button>
            <NavLink
                to="/activityBoard" state={{ eventIndex: props.value.eventID }}>
                <button onClick={storagehandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Go To HomePage</button>
            </NavLink>
            <div>
                {
                    artifactStatus === true &&
                    // <h1>hello</h1>
                    <Modal
                        show={artifactStatus}
                        onHide={changeHandler2}
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
                                <img src={IP+"getImage/?imgName=" + artifact} style={{ width: "400px" }}></img>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={changeHandler2}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        </div>

    );
}
export default WordleSolution;
