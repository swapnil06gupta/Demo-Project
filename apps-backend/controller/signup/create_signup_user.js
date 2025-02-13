const { signupModal } = require("../../model/signup/signup_schema");
const bcrypt = require("bcrypt");

const createUserByPost = async (req, res) => {
  try {
    const data = req.body;
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    const name = `${data.name}@${randomNumbers}`;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await signupModal.create({
      name: data.name,
      user_email: data.email,
      user_password: hashedPassword,
      user_name: name,
      user_createdAt: new Date(),
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database connection failed. Please try again later." });
  }
};

module.exports = { createUserByPost };
