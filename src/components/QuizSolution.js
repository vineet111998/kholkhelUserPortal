import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap'
function QuizSolution(props) {
  console.log(props);
  const changeHandler = () => [
    props.data(false)
    
  ]
  
  if(props.show===false){
   console.log("blocked")   
  }
  return (
    <Modal
      show={props.show}
      onHide={changeHandler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Activity Outcome
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>The correct Answers for the quiz are</h3>
          <ul>
            {props.value.map((item, index) => (
              <li style={{ width: "100%", display: "inline-block" }}
                key={index}>
                <div>Question: {item.questions} </div>
                <br></br>
                <div>Answer: {item.answers}</div>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={changeHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
    
  );
}
export default QuizSolution;
