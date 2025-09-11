const express = require("express");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const session = require("express-session");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/cart-items", cartRoute);

app.use(globalErrorHandler);
module.exports = app;
