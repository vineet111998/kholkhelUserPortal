import {
    useLocation,
      } from "react-router";
  import CardBoard from "./CardBoard";
  
    function ImplementCardBoard() {
      const location = useLocation();
      // console.log(location.state);
      return (
        <CardBoard
        gameData={location.state.eventIndex}
        selectedID={location.state.id}
        />
      );
    }
  
     export default ImplementCardBoard;