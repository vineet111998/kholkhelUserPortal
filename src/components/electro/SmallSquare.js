import React from 'react';
import './SmallSquare.css';
import imgUrlimg from './u1.jpg'
import {IP} from '../../connection';
function SmallSquare(props) {
    // console.log(props.imgUrl===undefined || Object.keys(props.imgUrl)<=0?imgUrlimg:props.imgUrl.qimg);
    const [imgUrl, setImgUrl] = React.useState( (props.imgUrl===undefined || props.imgUrl.qimg===undefined)?imgUrlimg:props.imgUrl.qimg)
    const tileStyle = {
        width: '100%',
        height: '100%',
        transiion:'2s ease',
        backgroundImage: `url("${IP}getImage/?imgName=${imgUrl}")`,
        backgroundSize:'cover',
        cursor: 'pointer'
      };
    return (
        
        <div className={'FillSquare'+props.value} id={props.value} style={{...tileStyle}} onClick={(e)=>{props.clickHandler("qindex",e.target.id)}}></div>
    )
}

export default SmallSquare;