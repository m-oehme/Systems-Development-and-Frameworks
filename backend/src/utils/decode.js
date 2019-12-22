const jwt = require("jsonwebtoken");
const decodedToken = token => {
  if (token) {
    return jwt.verify(token, "supersecret");
  }
  return null;
};
module.exports = { decodedToken };
