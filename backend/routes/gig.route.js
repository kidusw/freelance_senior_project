import express from "express";
import { verifyToken } from "../middleware/jwt.js";

import {createGig,deleteGig,getGig,getGigs,editGig} from "../controller/gig.controller.js";



const router=express.Router();

router.post("/",verifyToken,createGig);
router.delete("/:id",verifyToken,deleteGig);
router.get("/single/:id",verifyToken,getGig);
router.put("/edit/:id",verifyToken,editGig);
router.get("/",verifyToken,getGigs);

export default router;