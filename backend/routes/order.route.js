import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {getOrders,createOrder,makePayment,getSingleOrder} from "../controller/order.controller.js";



const router=express.Router();

router.post("/:gigId",verifyToken,createOrder);
router.get("/",verifyToken,getOrders);
router.post("/payment/:id",verifyToken,makePayment);
router.get("/single/:id",verifyToken,getSingleOrder);



export default router;