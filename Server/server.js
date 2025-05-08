const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user.route");
const entryRouter = require("./Routes/entry.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully Connected to DataBase"))
  .catch((err) => console.log(err));

app.use("/users", userRouter);
app.use("/entry", entryRouter);

app.use((req, res) => {
  res.status(404).send({ msg: "Undefined Route" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT} sucessfully.`);
});
