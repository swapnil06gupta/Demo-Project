const express = require("express");
const { validEmail } = require("../../middleware/signupValidation");
const {
  validate_login_user,
} = require("../../controller/login/validate_login_user");
const router = express.Router();

router.post("/", validEmail, validate_login_user);

module.exports = router;
