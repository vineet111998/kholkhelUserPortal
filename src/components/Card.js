import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../components/Card.css';
import { BsPlayFill } from 'react-icons/bs';
// import { withRouter } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.eventID);
    }
    state={
        flip:false
    }
    setflip=(gameStatus)=>{
        if(gameStatus==1)
        {
            console.log(gameStatus)
            this.setState({flip:true})
        }
        else{
            this.setState({flip:!this.state.flip})
        }
    }
    componentDidMount(){
        if(this.props.gameAttr.game_status==1){
        this.setflip(this.props.gameAttr.game_status);
        }
    }
    render() { 
        
        return (

            <div className={`flipCard ${this.state.flip ? 'flip' : ''}`} onClick={()=>{this.setflip(this.props.gameAttr.game_status)}}>
                <div className="flipCardInner" >
                        <div className="flipCardFront">
                            <h2 className="cardcontent">?</h2>
                        </div>
                        <div className="flipCardBack">
                            <h4 className="cardcontent">{this.props.outcome.outcome_name}</h4>
                            
                            {
                                this.props.gameAttr.game_type_id == 6 ?
                                (<NavLink 
                                to="/puzzle" state={{gameAttr:this.props.gameAttr,outcome:this.props.outcome,eventType:this.props.eventType,eventID:this.props.eventID,gameID:this.props.gameID}} >
                                    <BsPlayFill style={{fontSize:"40px", color:"white"}}/>
                                </NavLink>):
                            this.props.gameAttr.game_type_id == 3 ?
                            (<NavLink 
                            to="/quiz" state={{gameAttr:this.props.gameAttr,outcome:this.props.outcome,eventType:this.props.eventType,eventID:this.props.eventID,gameID:this.props.gameID}} >
                                <BsPlayFill style={{fontSize:"40px", color:"white"}}/>
                            </NavLink>):
                            this.props.gameAttr.game_type_id == 1 ?
                            (<NavLink 
                            to="/picturePuzzle" state={{gameAttr:this.props.gameAttr,outcome:this.props.outcome,eventType:this.props.eventType,eventID:this.props.eventID,gameID:this.props.gameID}}>
                                <BsPlayFill style={{fontSize:"40px", color:"white"}}/>
                                </NavLink>) :
                                this.props.gameAttr.game_type_id == 4 ?
                                (<NavLink 
                                to="/hangman" state={{gameAttr:this.props.gameAttr,outcome:this.props.outcome,eventType:this.props.eventType,eventID:this.props.eventID,gameID:this.props.gameID}}>
                                    <BsPlayFill style={{fontSize:"40px", color:"white"}}/>
                                </NavLink>):
                            (<NavLink 
                                to="/wordgame" state={{gameAttr:this.props.gameAttr,outcome:this.props.outcome,eventType:this.props.eventType,eventID:this.props.eventID,gameID:this.props.gameID}}>
                                    <BsPlayFill style={{fontSize:"40px", color:"white"}}/>
                                </NavLink>)
                            }
                        </div>
                    </div>
                </div>

            
          );
    }
}
 
export default Card;