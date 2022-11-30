import React, { Component } from 'react';
import {Modal,Button, ModalBody} from 'react-bootstrap';
import "../components/information.css";
import frstimage from "../resources/assets/1.png"
import scndimage from "../resources/assets/2.png"
import thrdsimage from "../resources/assets/3.png"

import {IoIosStats,IoIosSettings,IoMdHelpCircleOutline} from "react-icons/io";



const MyVerticallyCenteredModal = (props)=>{
  // console.log(props)  
    return (
      <Modal
        {...props}
        
        
        id="modall"
        >
          <div className="divv">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            How to play
          </Modal.Title>
        </Modal.Header>
        <ModalBody id='bodyy'>
        
          <p>
          Guess the <b>WORDLE</b> in 6 tries.<br/>

Each guess must be a valid 5 letter word. Hit the enter button to submit.<br/>

After each guess, the color of the tiles will change to show how close your guess was to the word.
          </p>
          <hr/>
      <p><b>Examples</b><br/>

    <img src={frstimage} style={{width:'50%'}}/><br/>
The letter W is in the word and in the correct spot.<br/>

<img src={scndimage} style={{width:'50%'}}/><br/>
    
The letter I is in the word but in the wrong spot.<br/>

    <img src={thrdsimage} style={{width:'50%'}}/><br/>
    
The letter U is not in the word in any spot.</p>
       
       </ModalBody>
       <Modal.Footer>
          
        </Modal.Footer>
        </div>
      </Modal>
    );
  }
class Information extends Component {
    constructor(props) {
        super(props);
    }
    state = { modalShow:false}

     
    render() { 

        
        return (
            <>
            <Button onClick={() => this.setState({ modalShow: true })}>
            <IoMdHelpCircleOutline />
            </Button>
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
            />
            </>
          );
    }
}

 
export default Information;