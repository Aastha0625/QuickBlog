import express from "express";
import jwt from "jsonwebtoken";

//  export const auth = (req,res,next)=> {
//     const token = req.headers.authorization;

//     try {
//         jwt.verify(token, process.env.JWT_SECRET)
//         next();
//     } catch (error) {
//         res.json({ success: false, message: "Unauthorized access" });
//     }
// }

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", req.headers.authorization);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // optional: store user data from token
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }
};
