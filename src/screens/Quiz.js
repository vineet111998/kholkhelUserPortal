import React, { Component } from "react";
import './Quiz.css';
import QuizSolution from '../components/QuizSolution';
import ReactAudioPlayer from 'react-audio-player';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {IP} from '../connection';
class Quiz extends Component {
    constructor(props) {
        super(props);
        //  const question=props.state.questions;
        // console.log(props);
        this.QuizData = props.gameAttr.gameAttr.game_attr;

        for (let i = 0; i < this.QuizData.length; i++) {
            this.QuizData[i].selectedAnswer = "";
            this.QuizData[i].score = 0;
        }
    }


    state = {
        userAnswer: "",
        currentIndex: 0,
        options: [],
        quizEnd: false,
        score: 0,
        nextdisabled: true,
        prevdisabled: false,
        prevAnswer: null,
        flip: false,
        active: false,
        status: false,
        artifactStatus: false,
        artifact: "",
    }

    //Component that holds the current quiz
    loadQuiz = () => {
        // const {currentIndex} = this.state //get the current question index
        this.setState(() => {
            return {
                question: this.QuizData[this.state.currentIndex].questions,
                options: this.QuizData[this.state.currentIndex].options,
                answer: this.QuizData[this.state.currentIndex].answers,
                value: this.QuizData[this.state.currentIndex].value,
                otherAttr:this.QuizData[this.state.currentIndex].otherAttr
            }
        }
        )
    }
    nextQuestionHanlder = () => {
        // const {userAnswer, answer, score,flip} = this.state
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null,
            flip: !this.state.flip
        })
    }

    prevQuestionHandler = () => {
        // const {answer, score ,flip} =this.state
        this.setState({
            currentIndex: this.state.currentIndex - 1,
            flip: !this.state.flip
        })


    }

    componentDidMount() {
        this.loadQuiz()
    }

    //Check the answer
    checkAnswer = (Answer) => {
        this.QuizData[this.state.currentIndex].selectedAnswer = Answer;
        // console.log(this.QuizData[this.state.currentIndex].selectedAnswer);
        const current_score = 0;
        this.setState({
            // userAnswer: Answer,
            nextdisabled: false
        })
        // console.log(this.state)
        // console.log(this.state.answer)
        if (this.QuizData[this.state.currentIndex].score === 0) {
            if (this.QuizData[this.state.currentIndex].selectedAnswer === this.state.answer) {
                this.setState({
                    score: this.state.score + 1
                })
                this.QuizData[this.state.currentIndex].score = 1;
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        if (this.state.currentIndex !== prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: this.QuizData[currentIndex].questions,
                    options: this.QuizData[currentIndex].options,
                    answer: this.QuizData[currentIndex].answers,
                    value: this.QuizData[currentIndex].value,
                    otherAttr:this.QuizData[currentIndex].otherAttr
                }
            });
        }
    }

    finishHandler = () => {
        // console.log('3176231723');
        var answerStatus = JSON.parse(localStorage.getItem('events'));
        // console.log(this.props.gameAttr);
        console.log(answerStatus[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.activeID]);
        this.setState({
            status: answerStatus[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.activeID].game_answer_status
        });

        if (this.state.currentIndex === this.QuizData.length - 1) {
            this.setState({
                quizEnd: true
            })
        }
        // console.log(this.props.gameAttr.eventType);
    }
    solutionHandler = (data) => {
        this.setState({
            active: true
        });
        if (data === false) {
            this.setState({
                active: false
            });
        }
        // if(this.state.active==false){
        //     alert("Options is blocked by admin!!!")
        // }
        // console.log(this.state.active)
    }
    // eventStatusArray = (artifact) => {//
    //     console.log("asdasdsadsadsa");
    //     artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_status = 1;
    //     var currentArtifacts=localStorage.getItem('artifactList');
    //     var date = new Date;
    //     var artifact_url =  artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_prev;
    //     var artifact_name= artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_name
    //     var artifactInfo={artifact_type:0,artifact_url:artifact_url,artifact_name:artifact_name,activityName: artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_name,eventName: artifact[this.props.gameAttr.eventID][0].tile_desc,date:date}
    //     if(currentArtifacts==null)
    //     {
    //         currentArtifacts=[];
    //         currentArtifacts.push(artifactInfo);
    //         localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    //     }
    //     else
    //     {
    //         currentArtifacts=JSON.parse(currentArtifacts);
    //         for(let i=0;i<currentArtifacts.length;i++)
    //         {
    //             if(currentArtifacts[i].activityName===artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_name) return artifact
    //         }
    //         currentArtifacts.push(artifactInfo);
    //         localStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    //     }
    //     return artifact;
    // }
    storagehandler = () => {
        var eventData = JSON.parse(localStorage.getItem('events'));
        // console.log(eventData);
        const newEventsData = this.eventStatusArray(eventData);
        localStorage.setItem("events", JSON.stringify(newEventsData));
    }
    artifactHandler = () => {
        var artifact = JSON.parse(localStorage.getItem('events'));
        this.setState({
            artifact: artifact[this.props.gameAttr.eventID][0].tile_game_info[this.props.gameAttr.gameID].game_artifact.artifact_prev,
            artifactStatus: true
        });
    }
    changeHandler = () => {
        this.setState({
            artifactStatus: false
        });
        // console.log(this.state.active)
    }
    render() {
        const { question, userAnswer, options, currentIndex, quizEnd, flip ,value,otherAttr} = this.state;
        if (quizEnd) {
            return (
                <> <div>
                    <h1>Game Over. Final score is {this.state.score} points</h1>
                    
                    <div>
                        {
                            // this.state.status &&
                            <button onClick={this.solutionHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Correct Answers</button>
                        }
                        {/* <button onClick={this.artifactHandler} style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Collect Artifact</button> */}
                        <NavLink
                           to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID,id:this.props.gameAttr.id }}  >    
                            <button style={{ borderRadius: "10px", padding: ".5%", border: "none", backgroundColor: "#573329", margin: "1% 5% 0px", color: "white" }}>Go To HomePage</button>
                        </NavLink>
                        <div>
                            {
                                this.state.artifactStatus === true &&
                                // <h1>hello</h1>
                                <Modal
                                    show={this.state.artifactStatus}
                                    onHide={this.changeHandler}
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
                                            <img style={{ width: "400px" }} src={IP+"getImage/?imgName=" + this.state.artifact}></img>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.changeHandler}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            this.state.active &&
                            <QuizSolution show={this.state.active} data={this.solutionHandler} value={this.QuizData} score={this.state.score} />
                            // &&
                            // alert("blocked!!")
                        }
                    </div>
                </div>
                </>
            )
        }
        return (
            <>
            <div style={{ width: "40%", margin:" -20px auto 20px", textAlign: "right"}}>
      <div style={{ width: "40%", display: "inline-flex", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
        <label style={{textAlign: "center", width: "60%", fontSize: "0.75vw", fontWeight: "500"}}>Selected language: </label>
        <span style={{fontSize: "0.75vw",fontWeight: "500" ,width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", display: "flex",justifyContent: "center", alignItems: "center", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}>{this.props.gameAttr.gameData[this.props.gameAttr.id].lang.lang_desc}</span>
        </div>
        </div>
                <div className="full">

                    <div className={`cardd ${flip ? 'flip' : ''}`}>
                        <div className={`quiz ${flip ? 'flip1' : ''}`}>
                            <h1 className="question">{question}</h1>
                            <div className="otherAttr">
                                {
                                    value==0 &&
                                    <img className="otherAttrImage" style={{width: "30%", maxWidth: "580px"}} src={IP+"getImage/?imgName="+otherAttr}/>
                                }
                                {
                                    value==1 &&
                                    <ReactAudioPlayer
                                        src={IP+"getImage/?imgName="+otherAttr}
                                        autoPlay
                                        controls
                                        />
                                }
                            </div>
                            <div className="hint">
                                {this.QuizData[currentIndex].selectedAnswer != "" &&

                                    <h4 style={{ color: "#573329", lineHeight: "68px", margin: "0",fontSize: "1vw",fontWeight: "bold" }}>Your selected answer:<span style={{ color: "green" }}>{this.QuizData[currentIndex].selectedAnswer}</span></h4>}
                            </div>
                            <Container>
                                <Row>
                                {
                                options.map((option, i) =>
                                <Col lg={6} xs={12} md={6} sm={12}>

                                    <p key={i} className={`options ${userAnswer === option || this.QuizData[currentIndex].selectedAnswer === option ? "selected" : null} `}
                                        onClick={() => this.checkAnswer(option)}>
                                        {option}
                                    </p>
                                    </Col>
                                )
                                
                                }
                              </Row>
                              </Container>
                            

                        </div>
                    </div>
                    <div style={{ width: "600px", margin: "0 auto" }}>

                        {(currentIndex > 0) ?
                            (<button onClick={this.prevQuestionHandler} style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", float: "left", color: "white" }}>Prev</button>)
                            : (<button disabled style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#E5E4E2", float: "left", color: "white" }}>Prev</button>)}

                        {(currentIndex < this.QuizData.length - 1) ?
                            (<button onClick={this.nextQuestionHanlder} style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", float: "right", color: "white" }}>Next</button>)
                            : (<button disabled style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#E5E4E2", float: "right", color: "white" }}>Next</button>)}
                    
                        {(currentIndex === this.QuizData.length - 1 && this.props.gameAttr.eventType ==2) &&
                        //  <NavLink
                         // ImplementCardBoard
                    //    to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID,id:this.props.gameAttr.id }}  >    
                           <button onClick={this.finishHandler} style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", color: "white" }}>Finish1</button>
                    //  </NavLink>
                        
                        }
                        {(currentIndex === this.QuizData.length - 1 && this.props.gameAttr.eventType==1) &&
                        
                        <button onClick={this.finishHandler} style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", color: "white" }}>Finish</button>
                        }

                    </div>
                </div>
            </>
        )

    }
}

export default Quiz;