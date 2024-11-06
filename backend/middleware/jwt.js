import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.authToken;
    if(!token) return next(createError(401,"You are not authenticated"));

    jwt.verify(token,process.env.JWT_KEY,async (err,payload)=>{
        if(err) return next(createError(403,"Token isn't valid"));
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        next();
    })

    
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  // if (!token) return res.status(401).json({ error: "Token required" });

  // jwt.verify(token, process.env.JWT_KEY, (err, user) => {
  //   if (err) return res.status(403).json({ error: "Invalid or expired token" });

  //   req.userId = user.id; // Attach user data to the request
  //   req.isSeller=user.isSeller;
  //   next();
  // });

}