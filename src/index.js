require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});

//define a config para o express conseguir lidar com requisicoes rest
app.use(express.json());
//define para o express lidar com req urlenconded
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(process.env.PORT || 3000);
