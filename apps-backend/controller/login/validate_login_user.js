const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../../helper/jwtAuth");
const { signupModal } = require("../../model/signup/signup_schema");

app.use(cookieParser());
app.use(express.json());

const validate_login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupModal.findOne({ user_email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    const token = generateToken(user);
    // const { exp } = jwt.decode(token);
    // const maxAge = exp * 1000 - Date.now();
    console.log(process.env.CLIENT_SIDE_URL, "before cookies");
    res.cookie("token", token, {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure:
        process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "development",
      maxAge: 3200000,
      sameSite: "None", // Prevent CSRF
    });
    console.log("after cookies");
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Server Error = ${error}` });
  }
};

module.exports = { validate_login_user };
