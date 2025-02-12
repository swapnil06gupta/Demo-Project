const express = require("express");
const {
  validEmail,
  checkDuplicate,
} = require("../../middleware/signupValidation");
const {
  createUserByPost,
} = require("../../controller/signup/create_signup_user");
const router = express.Router();

router.post("/", validEmail, checkDuplicate, createUserByPost);

module.exports = router;
