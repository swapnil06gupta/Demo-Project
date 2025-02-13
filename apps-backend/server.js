const express = require("express");
const app = express();
const routes = require("./routers/index");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
console.log("before cors");
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual origin of your client app
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable credentials (cookies) to be sent
  })
);
console.log("after cors");

const mongoUrl = process.env.MONGO_DB_KEY;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("DB Connect"))
  .catch((err) => console.error({ message: err }));

const port = 8080;

app.use("/app", routes);

app.listen(port, () => {
  console.log("Server Started");
});
