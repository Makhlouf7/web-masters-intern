const express = require("express");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/cartItems", cartRoute);

app.use(globalErrorHandler);
module.exports = app;
