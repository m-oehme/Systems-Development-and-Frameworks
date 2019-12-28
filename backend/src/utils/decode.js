import jwt from "jsonwebtoken";

export const decodedToken = token => {
  if (token) {
    return jwt.verify(token, "supersecret");
  }
  return null;
};
