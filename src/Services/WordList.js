import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { IP } from "../connection";
class WordList extends Component {
  static myInstance = null;

  static getInstance() {
    return new WordList();
  }
  getWordList(data) {
    return new Promise((resolve, reject) => {
      axios.post(IP+'game/getWordInfoByLengthAttr',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
}
export default WordList