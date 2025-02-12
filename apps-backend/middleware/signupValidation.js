const { signupModal } = require("../model/signup/signup_schema");

const validEmail = async (req, res, next) => {
  const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const data = req.body;
  if (!data) {
    return res.status(400).send({ message: "Some this is missing" });
  } else if (validate.test(data.email)) {
    next();
  } else {
    return res.status(400).send({ message: "Email is invalid." });
  }
};

const checkDuplicate = async (req, res, next) => {
  const data = req.body;
  const existingUser = await signupModal.findOne({ user_email: data.email });
  if (existingUser) {
    return res.status(400).send({ message: "Email already exists." });
  }
  next();
};

module.exports = { validEmail, checkDuplicate };
