const jwt = require("jsonwebtoken");
const decodedToken = (token, requireAuth = true) => {
  // const header = req.req.headers.authorization;

  if (token) {
    // const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "supersecret");
    return decoded;
  }
  if (requireAuth) {
    throw new Error("Login in to access resource");
  }
  return null;
};
module.exports = { decodedToken };
