const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
const featuresRouter = require("./routes/featuresRoute");
const dealsRouter = require("./routes/dealRoute");

app.use(express.json());

app.use("/features", featuresRouter);
app.use("/deals", dealsRouter);

app.use(globalErrorHandler);
module.exports = app;
