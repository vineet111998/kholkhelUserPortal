import { Card, Image } from "react-bootstrap";
import { IP } from '../connection'
const ArtifactPrev=(props)=>{
    console.log(props.value)
    return(
        
        <Card>
           
            
           <Image src={IP+"getImage/?imgName=" + props.value.artifact_url} style={{width:"70%",margin:"4% auto"}}></Image>
           <br></br>
           <h6>Event Name: {props.value.eventName}</h6>
            <h6>Artifact Name: {props.value.artifact_name}</h6>
        </Card>
    )
}
export default ArtifactPrev;