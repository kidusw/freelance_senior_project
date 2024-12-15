import express from "express";
import {deleteUser,getUser,editUser} from "../controller/user.controller.js"
import { verifyToken } from "../middleware/jwt.js";



const router=express.Router();

router.delete("/delete/:id",verifyToken,deleteUser);
router.put("/edit",verifyToken,editUser);
router.get("/:id",verifyToken,getUser);


export default router;