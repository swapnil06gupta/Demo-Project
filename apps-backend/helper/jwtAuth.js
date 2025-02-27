const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { name: user.user_name, email: user.user_email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1 hr",
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
