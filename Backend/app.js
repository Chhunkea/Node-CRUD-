const express = require("express");
const userRouter = require("./Routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./Controller/errorControllers");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/users", userRouter);

// Error runs when ROUTE does not exist
app.all("*", (req, res, next) => {
  next(new AppError("That Route is not avaiable", 404));
});

// Recieves ALL the errors
app.use(globalErrorHandler);

module.exports = app;
