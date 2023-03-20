import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
import Status from "../components/stats.css"
import {IoIosStats,IoIosSettings} from "react-icons/io";



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
          SETTINGS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id='bodyy'> 
          <h4>Hard Mode</h4>
          <p>
          Any revealed hints must be used in subsequent guesses
          </p>
          <hr/>
          <h4>Dark Theme</h4>
          <hr/>
          <h4>Color Blind Mode</h4>
          <p>High contrast colors</p>
          <hr/>
          <h4>Feedback  Email | Twitter</h4>
          <hr/>
        </Modal.Body>
        </div>
      </Modal>
    );
  }
class Settings extends Component {
    constructor(props) {
        super(props);
    }
    state = { modalShow:false}

     
    render() { 

        
        return (
            <>
            <Button onClick={() => this.setState({ modalShow: true })}>
            <IoIosSettings />
            </Button>
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
            />
            </>
          );
    }
}

 
export default Settings;