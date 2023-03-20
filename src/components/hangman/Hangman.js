import React, { Component } from 'react';
import './hangman.css';
import { randomWord } from './Words.js';
import Keyboard from './Keyboard'
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HangmanSolution from './hangmanSolution'
import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: props.gameAttr.gameAttr.game_attr[0],
      disabled:false,
      active:false,
      win:-1
    }
  }

  handleGuess = letter => {
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }
  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return(
    <Keyboard onclick={this.handleGuess}  data={this.state.guessed}/>
    )
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    });
  }
  finishHandler=()=>{
    this.setState({
      active:true
    })
  }
  render() {
    var gameOver = this.state.mistake >= this.props.maxWrong;
    var isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    // if (isWinner) {
    //   gameStat = "You Won!!!"
    //   return (
    //     <h1>hello</h1>
    //   )
    // }

    // if (gameOver) {
    //   // gameStat = "You Lost!!!"
     
    // }

    return (
      <div>
        {
          !this.state.active &&
      <div className="Hangman container">
        <h1 className='text-center'>Hangman</h1>
        <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        {
            (!isWinner && !gameOver) &&
          <div className="text-center">
          <p>Guess the Programming Language:</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <div style={{display:"block",transition:"5s"}}>{gameStat}</div>
          </div>
        }
          {
             isWinner &&
             <Card style={{ width: '18rem',margin:"2% auto",display:"block"}}>
              <Card.Body>
                <Card.Text>
                      Congratulations!!!!!
                      <br></br>
                      You got it Correct.
                </Card.Text>
                 <NavLink
                         // ImplementCardBoard
                       to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID,id:this.props.gameAttr.id }}  >    
                           <button style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", color: "white" }}>Finish</button>
                     </NavLink>
              </Card.Body>
            </Card>
          }
           {
            gameOver &&
             <Card style={{ width: '18rem',margin:"2% auto",display:"block",transition:"2s"}}>
            <Card.Body>
              <Card.Text>
                    You Lost!!!
              </Card.Text>
               <NavLink
                         // ImplementCardBoard
                       to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID,id:this.props.gameAttr.id }}  >    
                           <button style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", color: "white" }}>Finish</button>
                     </NavLink>
            </Card.Body>
          </Card>
          }
       
      </div>
      }
      {
        this.state.active &&
        <HangmanSolution value={this.props.gameAttr} />
      }
      </div>
    )
  }
}

export default Hangman;