import express from "express";
import {register,login,logout, profile,refreshToken} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh",refreshToken);
router.get("/profile",verifyToken,profile);


export default router;