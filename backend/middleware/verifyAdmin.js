import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Login required to access admin pages." });
  }
  try {
    console.log(process.env.SECRET_KEY);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);

    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    console.log(decoded);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

export default verifyAdmin;
