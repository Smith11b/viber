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
  fileName: String,
  filePath: String
});

const Video = mongoose.model("Video", videoSchema);

// Server ---------------->

const app = express();

const upload = multer({ dest: __dirname + "/public/videos" });
const type = upload.single("video");

app.post("/api/recordings", type, (req, res) => {
  console.log(req.body, req.file);
  const newVid = new Video({
    fileName: req.file.filename,
    filePath: req.file.path
  });
  newVid.save();
  res.send(req.file.filename);
});

app.get("/api/vids/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  res.sendFile(`/Users/student/Dev/Viber/public/videos/${fileName}`);
});

app.use(express.static("public"));

app.listen(process.env.PORT, () =>
  console.log("Mr smith I have your server ready")
);
