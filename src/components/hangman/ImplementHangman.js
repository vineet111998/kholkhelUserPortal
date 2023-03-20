import {
    useLocation,
  } from "react-router";
  import Hangman from "./Hangman";
  
    function ImplementHangman() {
      const location = useLocation();
      // console.log(location.state)
      return (
        <Hangman
        gameAttr={location.state}
        />
      );
    }
  
     export default ImplementHangman;