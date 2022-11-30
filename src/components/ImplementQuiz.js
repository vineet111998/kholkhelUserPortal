import {
    useLocation,
  } from "react-router";
  import Quiz from "../screens/Quiz";
  
    function ImplementQuiz() {
      const location = useLocation();
      // console.log(location.state)
      return (
        <Quiz
        gameAttr={location.state}
        />
      );
    }
  
     export default ImplementQuiz;