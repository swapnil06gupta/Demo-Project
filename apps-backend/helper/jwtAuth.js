const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  console.log(process.env.SECRET_KEY, user, "498498389");
  return jwt.sign(
    { name: user.user_name, email: user.user_email },
    process.env.SECRET_KEY,
    {
      expiresIn: "2m",
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
