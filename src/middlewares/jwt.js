const jwt = require("jsonwebtoken");
const wrapper = require("../utils/wrapper");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return wrapper.errorResponse(res, "Unauthorized", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return wrapper.errorResponse(res, "Unauthorized", 401);
    }

    req.user = decoded;

    next();
  });
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { verifyToken, generateToken };
