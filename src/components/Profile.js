import React, {Component} from "react";
import {Modal,Button} from 'react-bootstrap';
import {IoMdPerson} from "react-icons/io";


const MyVerticallyCenteredModal = (props)=>{
    // console.log(props)  
      return (
        <Modal
          {...props}
          
          id="modall"
        >
            <div className="divv" style={{width: "50%"}}>
          <Modal.Header closeButton>
     
          </Modal.Header>
          <Modal.Body id='bodyy'> 
            
          </Modal.Body>
          </div>
        </Modal>
      );
    }

    class Profile extends Component {
        constructor(props) {
            super(props);
        }

    state = { modalShow:false}

     
    render() { 

        
        return (
            <>
            <Button onClick={() => this.setState({ modalShow: true })}>
            <IoMdPerson />
            </Button>
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
            />
            </>
          );
    }

}

export default Profile;
