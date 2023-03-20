import {
    useLocation,
  } from "react-router";
  import Scramble from "./Jigsaw";
  
    function ImplementScramble() {
      const location = useLocation();
      return (
    
        <Scramble
        gameAttr={location.state}
        />
      );
    }
  
     export default ImplementScramble;