const express = require("express");
const multer = require("multer");
require("dotenv").config();

const app = express();

const upload = multer({ dest: __dirname + "/public/videos" });
const type = upload.single("video");

app.post("/api/recordings", type, (req, res) => {
  console.log(req.body);

  res.send("good job");
});


app.use(express.static('public'))


app.listen(process.env.PORT, () =>
  console.log("Mr smith I have your server ready")
);
