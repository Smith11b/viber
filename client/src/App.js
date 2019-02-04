import React, { Component } from "react";
import Logo from "./component/Logo";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NavBar from "./component/NavBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myVideoSrc: null,
      theirVideoSrc: null,
      endpoint: "https://127.0.0.1:4001",
      isRecording: false,
      videoBlob: null
    };
    this.getWebCam = this.getWebCam.bind(this);
    this.recordVideo = this.recordVideo.bind(this);
  }

  async getWebCam() {
    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .catch(err => console.log("uh ohh we have a problem ", err.message));
    this.setState({ myVideoSrc: stream });
    const myvid = document.getElementById("main-vid");
    myvid.srcObject = stream;
    myvid.play();
    return stream;
  }

  recordVideo() {
    if (!this.state.myVideoSrc) {
      console.log("You haven't started the video yet.");
      return;
    }
    if (!this.state.isRecording) {
      var chunks = [];
      const fileType = { mimeType: "video/webm" };
      var record = new MediaRecorder(this.state.myVideoSrc, fileType);
      record.ondataavailable = e => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      record.start(10);
      this.setState({ isRecording: true });
    } else {
      record.stop();
      this.setState({ isRecording: false });
      setTimeout(() => {
        let superBlob = new Blob(chunks, { type: "video/webm" });
        this.setState({ videoBlob: superBlob });
      }, 2 * 1000);
    }
  }

  async sendVideoToServer(){
    const fd = new FormData();
    fd.append('upl', localStorage.myfile, 'blob-vid')
    fetch('api/recordings', {
      method: 'post',
      body: fd
    })
    
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
          <Route
            path="/"
            render={props => <Home {...props} vidStart={this.getWebCam} />}
          />
          <Route path="/recordings" />
        </Switch>
        <NavBar />
      </div>
    );
  }
}

export default App;
