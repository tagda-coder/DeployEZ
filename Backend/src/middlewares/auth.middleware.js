const jwt = require("jsonwebtoken");
// const BlackList = require("../models/blacklist.model");
const redis = require("../config/cache");
const authMiddleware = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   return res.status(401).json({
    //     Message: "No Token Provided",
    //   });
    // }

    // const token = authHeader.split(" ")[1];

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        err: "Unauthorized",
      });
    }

    // // Check if token is blacklisted or not from BlackList Mongodb.
    // const isBlackListed = await BlackList.findOne({ token: token });

    // Check if token is blacklisted or not from Redis DB
    const isBlackListed = await redis.get(token);
    if (isBlackListed) {
      return res.status(401).json({
        message: "Token is Invalidated. please login again.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Now set this decoded part to your user request.
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      Message: "401 Unauthorized Access!",
      Error: error.message,
    });
  }
};

module.exports = authMiddleware;
