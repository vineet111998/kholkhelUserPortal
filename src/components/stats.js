import React, { Component } from 'react';
import {Modal,Button, Row, Col} from 'react-bootstrap';
import Status from "../components/stats.css"
import {IoIosStats} from "react-icons/io";



const MyVerticallyCenteredModal = (props)=>{
  // console.log(props)  
    return (
      <Modal id='modal'
        {...props}
        
        size="lg"
        dialogClassName="modal-80w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <div className='statsdiv'>
        <Modal.Header closeButton id='header'>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
        </Modal.Header>
        
          <h4>Statistics</h4>
         <Row id='row'>
           <Col><h1>0</h1>Played</Col>
           <Col><h1>0</h1>Wins %</Col>
           <Col><h1>0</h1>Current Streak</Col>
           <Col><h1>0</h1>Max Streak</Col>

         </Row>
         <h4 style={{}}>Guess Distributions</h4>
        
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
        </div>
      </Modal>
    );
  }
class Stats extends Component {
    constructor(props) {
        super(props);
    }
    state = { modalShow:false}

     
    render() { 

        
        return (
            <>
            <Button onClick={() => this.setState({ modalShow: true })}>
            <IoIosStats />
            </Button>
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
            />
            </>
          );
    }
}

 
export default Stats;