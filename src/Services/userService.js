import axios from "axios";
import { Axios } from 'axios';
import React,{Component} from "react";
 import {IP} from '../connection';
class getEvent extends Component {
    static myInstance = null;
    
    static getInstance() { 
      
        return new getEvent();
            
    }
    
    registerService(data) {
        return new Promise((resolve,reject)=>{
            var newData =JSON.stringify(data);
          axios.post(IP+'register',data)
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         
    }

    loginService(data){
      // Axios.defaults.withCredentials=true 
        return new Promise((resolve,reject)=>{
            var newData=JSON.stringify(data);
            axios.post(IP+'login',data)
            .then(function (response) {
              //   console.log(response.data);
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
  
          })         
    }
    getAllLanguage(data) {
      return new Promise((resolve,reject)=>{
        axios.post(IP+'lang/getLang',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      })         }
}
    export default getEvent