import React, { Component } from 'react';
import Card from "../components/Card";
import stylesCardBoard from "../components/CardBoard.module.css";
import MultiLingual from './MultiLingual';
import GameStatus from '../screens/gameStatus';
class CardBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageData: [],
            eventID: -1,
            total:0,
            gameAttr:[],
            activeID:-1,
            status:false
        }
        console.log(props);
    }

    componentDidMount() {
       if(this.state.storageData.length==0) this.getData();
    }
    async getData() {
        
        var eventID = this.props.gameData;
        var gameData = await JSON.parse(localStorage.getItem('events'));
        this.setState({ storageData: gameData[eventID], eventID: eventID })
        if(this.state.storageData[0].event_type_id==1)
        {
        this.state.storageData[0].tile_game_info.map((e) => {
            this.setState({
                total :this.state.total+ e.game_status})
        })
        if (this.state.total == this.state.storageData[0].tile_game_info.length) {
        var currentArtifacts=localStorage.getItem('artifactList');
        if(!this.state.storageData[0].hasOwnProperty('tile_artifact_info'))
        {

        }
        else{
        var date = new Date();
        var artifact_url = this.state.storageData[0].tile_artifact_info.artifact_prev;
        var artifact_name=this.state.storageData[0].tile_artifact_info.artifact_name
        var artifactInfo={artifact_type:1,artifact_url:artifact_url,artifact_name:artifact_name,eventName:this.state.storageData[0].tile_desc,date:date}
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
                if(currentArtifacts[i].eventName ===this.state.storageData[0].tile_desc && currentArtifacts[i].artifact_type==1) return this.state.storageData[0]
            }
            currentArtifacts.push(artifactInfo);
            localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
        }
        }
    }
    }
     else if(this.state.storageData[0].event_type_id==2)
    {
       
        let date= new Date();
            
     for(let i=0;i<this.state.storageData[0].tile_game_info.length;i++)
    {
        
        var getDate=new Date(this.state.storageData[0].tile_game_info[i].forDate);
        //check for date and the status of the activity on the day--> 0=active, 1=inactive
        if(getDate.getDate()==date.getDate() && this.state.storageData[0].tile_game_info[i].game_status==0)
        {
            this.setState({
                activeID: i,
                });
            this.setState({
                gameAttr: this.state.storageData[0].tile_game_info[i].multiGameData,
                });

            break;
        }
        else if(getDate.getDate()==date.getDate() && this.state.storageData[0].tile_game_info[i].game_status==1){
            this.setState({
                status :true})
        }
        
    }
    }

    }
    render() {
        // console.log(this.state)
        return (
            <div className={stylesCardBoard.boardContainer}>
                {(this.state.storageData.length > 0 && this.state.storageData[0].event_type_id==1) &&
                    <div className={stylesCardBoard.flexContainer}>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 1 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[0]} outcome={this.state.storageData[0].tile_type[0]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={0} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 2 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[1]} outcome={this.state.storageData[0].tile_type[1]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={1} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 3 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[2]} outcome={this.state.storageData[0].tile_type[2]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={2} />
                            }
                        </div>
                    </div>
                }
                {(this.state.storageData.length > 0 && this.state.storageData[0].event_type_id==1) &&
                    <div className={stylesCardBoard.flexContainer}>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 4 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[3]} outcome={this.state.storageData[0].tile_type[3]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={3} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 5 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[4]} outcome={this.state.storageData[0].tile_type[4]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={4} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 6 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[5]} outcome={this.state.storageData[0].tile_type[5]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={5} />
                            }
                        </div>
                    </div>
                }
                 {(this.state.storageData.length > 0 && this.state.storageData[0].event_type_id==1) &&
                    <div className={stylesCardBoard.flexContainer}>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 7 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[6]} outcome={this.state.storageData[0].tile_type[6]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={6} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 8 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[7]} outcome={this.state.storageData[0].tile_type[7]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={7} />
                            }
                        </div>
                        <div>
                            {this.state.storageData[0].tile_type.length >= 9 &&
                                <Card gameAttr={this.state.storageData[0].tile_game_info[8]} outcome={this.state.storageData[0].tile_type[8]} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id} gameID={8} />
                            }
                        </div>
                    </div>
                }
                 {(
                    this.state.gameAttr.length > 0 && this.state.storageData[0].event_type_id==2) &&
                    <MultiLingual gameAttr={this.state.gameAttr} activeID={this.state.activeID} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id}/>
                 }
                 {
                    this.state.status==true &&
                    <GameStatus/>
                 }
            </div>
        );
    }
}

export default CardBoard;