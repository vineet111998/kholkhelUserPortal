import React from "react";
import { useNavigate  } from 'react-router-dom';

// import CardBoard from "../components/CardBoard";
import stylesHeader from "../screens/Header.module.css";
import logo from "../resources/assets/logo.png";
import tagline from "../resources/assets/kholkhel_tag.png";
import Stats from '../components/stats';
import Artifact from '../components/artifact'
import { Button, Col,Row } from "react-bootstrap";
import Settings from "../components/settings";
import Information from "../components/information";
import {IoMdLogOut} from "react-icons/io";




function Header() {

    const history = useNavigate();
    
const handleSubmit = () => {
    window.localStorage.clear();
    history("/login");
}
    return (  
       <> 
        <section>

            <Row style={{margin: "0"}}>
                <Col md={3}><Information />
                <Artifact/>
                </Col>
                <Col md={6}>
                <img src={logo} alt=""/>
                </Col>
            <Col md={3}>
            <Settings />
               
            <Stats />
            <Button onClick={()=>handleSubmit()}>
            <IoMdLogOut />
            </Button>
            </Col>

            </Row>

        </section>



<div className={stylesHeader.linetag} style={{maxWidth: "832px"}}><img src={tagline} alt=""/></div>


        </>
        
    );
}

export default Header;