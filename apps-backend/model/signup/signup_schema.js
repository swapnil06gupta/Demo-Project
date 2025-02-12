const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_createdAt: {
    type: Date,
    require: true,
  },
});

const signupModal = mongoose.model("signupData", signupSchema);
module.exports = { signupModal };
