import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import { createReview,getReviews,deleteReview } from "../controller/review.controller.js";



const router=express.Router();

router.post("/",verifyToken,createReview);
router.get("/:gigId",verifyToken,getReviews);
// router.get("/:id",verifyToken,deleteReview);


export default router;