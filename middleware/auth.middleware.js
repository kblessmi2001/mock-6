const jwt = require("jsonwebtoken");
require("dotenv").config();

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.payload = decoded.userID;

      console.log(decoded.userID);
      next();
    } else {
      return res.status(403).json({ msg: "Please Login.." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { authmiddleware };