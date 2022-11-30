import React from "react";
// import CardBoard from "../components/CardBoard";
import stylesHeader from "../screens/Header.module.css";
import logo from "../resources/assets/logo.png";
import tagline from "../resources/assets/kholkhel_tag.png";
import Stats from '../components/stats';
import Artifact from '../components/artifact'
import { Col,Row } from "react-bootstrap";
import Settings from "../components/settings";
import Information from "../components/information";

function Header() {
    return (  
       <> 
        <section>

            <Row>
                <Col md={3}><Information /></Col>
                <Col md={6}>
                <img src={logo} alt=""/>
                </Col>
            <Col md={3}>
                <Artifact/>
            <Stats />
            <Settings />
            </Col>
           
            </Row>
        </section>
        <div className={stylesHeader.linetag}><img src={tagline} alt=""/></div>
        </>
        
    );
}

export default Header;