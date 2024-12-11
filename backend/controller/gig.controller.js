import Gig from "../models/gigmodel.js";
import createError from "../utils/createError.js";


export const createGig=async(req,res,next)=>{
    // if(!req.isSeller) return next(createError(403,"only sellers can create a gig"));
      const user=req.userData;
      console.log("body",user._id);
    console.log(req.body);
    const newGig=new Gig({
        ...req.body,
        userId:user._id,
    });
console.log("new gig",newGig);
    try {
        const savedGig=await newGig.save();
        console.log(savedGig)
        res.status(201).json(savedGig);
    }catch (error) {
      next(error);  
    }
}   


export const editGig = async(req,res,next)=>{
    const updatedData=req.body;
    const gigId=req.params.id;
   
    try {
        const updatedGig=await Gig.findOneAndUpdate({_id:gigId},
            {$set:updatedData},
            {new:true});
       res.status(200).send("gig updated succssesfully!");
    } catch (error) {
            next(error);   
    }
}

export const deleteGig=async(req,res,next)=>{
    try {
        const gig=await Gig.findById(req.params.id);
        if(gig.userId!==req.userId) return next(createError(403,"You can delete only your gig"));
        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted");
    } catch (error) {
        next(error);
    }
}
export const getGig=async(req,res,next)=>{
     try {
        const gig=await Gig.findById(req.params.id);
        if(!gig) return next(createError(404,"Gig not found"));
        res.status(200).send(gig);
    } catch (error) {
        next(error);
    }
}
export const getGigs=async(req,res,next)=>{
    const q=req.query;
    const filters={
        ...(q.userId && {userId:q.userId}),
        ...(q.cat &&{cat:{$regex:q.cat,$options:"i"}}),
        // price:{$gt:80},
        ...((q.min || q.max)&&{
            price:{...(q.min&& {$gt:q.min}),...(q.max&&{$lt:q.max})}
        }),
        ...(q.search && {title:{$regex:q.search,$options :"i"}}),
    }
     try {
        const gigs=await Gig.find(filters).sort({[q.sort]:-1});
        res.status(200).send(gigs);
    } catch (error) {
        next(error);
    }
}
