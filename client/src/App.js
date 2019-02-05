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
      videoBlob: null,
      MediaRecorder: null,
      chunks: null,
      blobSrc: null,
      recordings: []
    };
    this.getWebCam = this.getWebCam.bind(this);
    this.recordVideo = this.recordVideo.bind(this);
    this.sendVideoToServer = this.sendVideoToServer.bind(this);

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

  async getRecordings(){
    
  }

  recordVideo() {
    if (!this.state.myVideoSrc) {
      console.log("You haven't started the video yet.");
      return;
    }
    const fileType = { mimeType: "video/webm;codecs=h264" };
    if (!this.state.isRecording) {
      var record = new MediaRecorder(this.state.myVideoSrc, fileType);
      this.setState({ MediaRecorder: record });
      var chunks = [];
      record.ondataavailable = e => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          this.setState({ chunks });
        }
      };
      record.start(1);
      this.setState({ isRecording: true });
    } else {
      this.state.MediaRecorder.stop();
      this.setState({ isRecording: false });
      let superBlob = new Blob(this.state.chunks, { type: "video/webm" });
      this.setState({ videoBlob: superBlob });
      this.sendVideoToServer();
    }
  }




  async sendVideoToServer() {
    const fd = new FormData();
    fd.append("video", this.state.videoBlob);
    const res = await fetch("/api/recordings", {
      method: "post",
      data: fd,

      body: fd
    }).catch(err => console.log("somethings wrong ", err.message));

    console.log(res.body, this.state.videoBlob);
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
            render={props => (
              <Home
                {...props}
                state={this.state}
                vidStart={this.getWebCam}
                recordVideo={this.recordVideo}
              />
            )}
          />
          <Route path="/recordings" />
        </Switch>
        <NavBar />
      </div>
    );
  }
}

export default App;
