import Review from "../models/reviewmodel.js";
import createError from "../utils/createError.js"
import Gig from "../models/gigmodel.js";

export const createReview=async(req,res,next)=>{
      console.log("Request Body:", req.body);
     const user=req.userData;
     if(req.isSeller) return next(createError(403,"Sellers can't create a review"))
        const newReview=new Review({
    userId:user._id,
    gigId:req.body.gigId,
    desc:req.body.desc,
    star:req.body.star,
    });
    try {
       const review=await Review.findOne({gigId:req.body.gigId,userId:req.userId,})

       if(review) return next(createError(403,"You have already created a review"));
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}})
        const savedReview=await newReview.save();
        res.status(201).send(savedReview);

    } catch (error) {
        next(error);
    }
}
export const getReviews=async(req,res,next)=>{
    try {
        const reviews =await Review.find({gigId:req.params.gigId});
           res.status(200).send(reviews);
    } catch (error) {
        next(error);
    }
}
export const deleteReview=async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error);
    }
}