// import React, { Component } from 'react';
import stylesFooter from "../screens/Footer.module.css";
import tagline from "../resources/assets/kholkhel_tag.png";

function Footer() {
    return (

        <div className={stylesFooter.linetag} style={{maxWidth: "832px"}}><img src={tagline} alt=""/></div>
      );
}

export default Footer;