import React from "react";
const ArtifactService=()=>{
    function setArtifact(artifact,eventID,gameID)
    {
    var currentArtifacts=localStorage.getItem('artifactList');
    if(currentArtifacts==null)
    {
        currentArtifacts=[];
    }
    else
    {
        currentArtifacts=JSON.parse(currentArtifacts);
        for(let i=0;i<currentArtifacts.length;i++)
        {
            if(currentArtifacts[0].activityName===artifact[eventID][0].tile_game_info[gameID].game_name) return artifact;
        }
    }
    var date = new Date;
    var artifact_url = artifact[eventID][0].tile_game_info[gameID].game_artifact.artifact_prev;
    var artifact_name=artifact[eventID][0].tile_game_info[gameID].game_artifact.artifact_name
    var artifactInfo={artifact_type:0,artifact_url:artifact_url,artifact_name:artifact_name,activityName:artifact[eventID][0].tile_game_info[gameID].game_name,eventName:artifact[eventID][0].tile_desc,date:date}
    currentArtifacts.push(artifactInfo);
    localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    }

}
export default ArtifactService;