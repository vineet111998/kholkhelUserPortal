import React, { Component } from "react";
import "./Jigsaw.css";
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GraphemeSplitter  from 'grapheme-splitter';
import $ from 'jquery';
class Jigsaw extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pieces: [],
    shuffled: [],
    solved: [],
    words:this.props.gameAttr.gameAttr.game_attr[0].trim(),
    gameOver: false
  };

  componentDidMount() {
    var splitwords=this.state.words.split(" ");
    console.log(splitwords.length);
    if(splitwords.length > 1)
    {

    }
    else
    {
      var splitter = new GraphemeSplitter();
      splitwords=splitter.splitGraphemes(this.state.words);  
    }
    const pieces = splitwords.map((data, i) => ({
      img: data,
      order: i,
      board: "shuffled"
    }));

    this.setState({
      pieces,
      shuffled: this.shufflePieces(pieces),
      solved: [...Array(splitwords.length)]
    });
  }

  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;

    const pieceOrder = e.dataTransfer.getData("text");
    const pieceData = this.state.pieces.find((p) => p.order === +pieceOrder);
    const origin = this.state[pieceData.board];

    if (targetName === pieceData.board) target = origin;
    origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;  
    pieceData.board = targetName;

    this.setState({ [pieceData.board]: origin, [targetName]: target });
    this.checkGameState();
  }

  checkGameState(){
    var count=0;
    this.state.solved.map((data,i)=>{
      if(data!=undefined && data.order==i)
      {
        count++;
      }
      else
        return;
    });
    console.log(count);
    if(count==this.state.solved.length){
      // console.log("over");
      this.setState({gameOver:true});
      $(".jigsaw").css("pointer-events","none"); 
    }
  }
  handleDragStart(e, order) {
    const dt = e.dataTransfer;
    dt.setData("text/plain", order);
    dt.effectAllowed = "move";
  }

  render() {
    return (
      <>
      <div style={{ margin:" -20px auto 20px",maxWidth: "832px"}}>
      <div style={{ width: "90%", textAlign: "right", margin: "0 auto"}}>
      <div style={{ width: "40%", display: "inline-flex", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
        <label style={{textAlign: "center", width: "60%"}}>Selected language: </label>
        <span style={{width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}>{this.props.gameAttr.gameData[this.props.gameAttr.id].lang.lang_desc}</span>
        </div>
        </div>
        </div>
      <div className="jigsaw">
      <div
          className="jigsaw__solved-board"
        >
          {this.state.solved.map((piece, i) =>
            this.renderPieceContainer(piece, i, "solved")
          )}
        </div>
        <div className="jigsaw__shuffled-board">
          {this.state.shuffled.map((piece, i) =>
            this.renderPieceContainer(piece, i, "shuffled")
          )}
        </div>
        
      </div>
      <div>
        {
          this.state.gameOver &&
      <Card style={{ width: '18rem',margin:"2% auto",display:"block",transition:"2s"}}>
            <Card.Body>
              {/* <Card.Title></Card.Title> */}
              <Card.Text>
                    Congratulations!!!!!
                    <br></br>
                    You got it Correct.
              </Card.Text>
              {
              <NavLink
              // ImplementCardBoard
            to="/activityBoard" state={{ eventIndex: this.props.gameAttr.eventID,id:this.props.gameAttr.id }}  >    
                <button style={{ borderRadius: "10px", padding: "1% 2%", border: "none", backgroundColor: "#573329", color: "white" }}>Finish</button>
          </NavLink>
              }
            </Card.Body>
          </Card>
        }
      </div>
      </>
    );
  }

  renderPieceContainer(piece, index, boardName) {
    // console.log(piece);
      return (
        <div
        className="lidiv"
          key={index}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.handleDrop(e, index, boardName)}
          style={{width:piece!=undefined? "auto":"100px",height:piece!=undefined? "auto":"125px"}}
        >
          {piece && (
            <div
            style={{width:"auto",height:"auto",textAlign:"center",fontSize:"50px",textSizeAdjust:"auto",textTransform: "uppercase"}}
              draggable
              onDragStart={(e) => this.handleDragStart(e, piece.order)}
            >
              {piece.img}
              </div>
          )}
        </div>
      );
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    return shuffled;
  }
}

export default Jigsaw;
