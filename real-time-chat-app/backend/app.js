const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(globalErrorHandler);
module.exports = app;
