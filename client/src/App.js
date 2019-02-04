import React, { Component } from "react";
import Logo from "./component/Logo"
import {Route, Switch} from "react-router-dom"
import Home from "./Home";
import NavBar from "./component/NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myVideoSrc: null,
      theirVideoSrc: null,
      endpoint: "https://127.0.0.1:4001"
    };
    // this.getWebCam = this.getWebCam.bind(this);
  }

  // // async getWebCam() {
  // //   const stream = await navigator.mediaDevices
  // //     .getUserMedia({ video: true, audio: true })
  // //     .catch(err => console.log("did not work", err.message));
  // //   const chunks = [];
  // //   this.setState({ myVideoSrc: stream });
  // //   const myVid = document.getElementById("myVid");
  // //   const thierVid = document.getElementById("thierVid");
  // //   const record = new MediaRecorder(stream, { mimeType: "video/webm" });
  // //   record.ondataavailable = e => {
  // //     if (e.data.size > 0) {
  // //       chunks.push(e.data);
  // //     }
  // //   };
  // //   myVid.srcObject = stream;
  // //   myVid.play();
  // //   record.start(10);
  // //   setTimeout(() => {
  // //     let superBlob = new Blob(chunks, { type: "video/webm" });
  // //     thierVid.src = window.URL.createObjectURL(superBlob);
  // //     thierVid.play();
  // //   }, 10 * 1000);

  // //   return stream;
  // // }

  // // componentDidMount() {
  // //   this.getWebCam();
  // // }



  render() {
    return (
      <div>
      <Logo />
      <Switch>
      <Route path = "/" render = {props => (<Home {...props} /> )}/>
      <Route path = "/recordings" />
      </Switch>
      <NavBar />
      </div>
    );
  }
}

export default App;
