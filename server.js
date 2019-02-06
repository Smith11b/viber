const express = require("express");
const multer = require("multer");
require("dotenv").config();

// Mongoose and Database Setup ------>
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Videos");
db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("we're connected!"));

// Schema Setup ------>

const videoSchema = new mongoose.Schema({
  fileName: String
});

const Video = mongoose.model("Video", videoSchema);

// Server ---------------->

const app = express();
app.use(express.json());

const upload = multer({ dest: __dirname + "/public/videos" });
const type = upload.single("video");

app.post("/api/recordings", type, (req, res) => {
  console.log(req.body, req.file);
  const newVid = new Video({
    fileName: req.file.filename
  });
  newVid.save();
  res.send(req.file.filename);
});

app.get("/api/recordings", (req, res, next) => {
  //   Video.find()
  //     .then(videos => {
  //       console.log(typeof videos);
  //       return res.status(200).send(videos);
  //     })
  //     .catch(err => console.log("nope didn't work ", err.message));
  Video.find((err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(data);
  });
});

app.get("/api/vids/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  res.sendFile(`/Users/student/Dev/Viber/public/videos/${fileName}`);
});

app.use(express.static("public"));
app.use((err, req, res, next) => {
  res.send("Something went wrong");
});

app.listen(process.env.PORT, () => {
  console.log("Mr smith I have your server ready");
});
