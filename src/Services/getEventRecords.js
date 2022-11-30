import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import {IP} from '../connection'
class GetEventRecords extends Component {
  static myInstance = null;

  static getInstance() {
    return new GetEventRecords();
  }
  getRecords(data) {
    return new Promise((resolve, reject) => {
      axios.get(IP+'game/getCurrentTiles')
        .then(function (response) {
          resolve(response.data.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
}
export default GetEventRecords
