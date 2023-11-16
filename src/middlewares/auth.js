const jwt = require("jsonwebtoken");

const verifyUser = async (socket, next) => {
  try {
    if (socket.handshake.query && socket.handshake.query.token) {
      const decoded = jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET);
      console.log(decoded);
      socket.decoded = decoded;
      next();
    } else {
      next(new Error("Authentication error"));
    }
  } catch (error) {
    console.log(error);
    next(new Error("Authentication error"));
  }
};

module.exports = { verifyUser };
