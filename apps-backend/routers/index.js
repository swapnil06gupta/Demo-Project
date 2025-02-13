const express = require("express");
const router = express.Router();
const app = express();
const loginRouter = require("./Auth/login");
const signupRouter = require("./Auth/sign");

const text = "Welcome Home!";
console.log("baceeeee");
router.get("/", (req, res) => {
  console.log("inside router");
  res.status(200).json({ message: text });
});

router.use("/login", loginRouter);
router.use("/signup", signupRouter);

module.exports = router;
