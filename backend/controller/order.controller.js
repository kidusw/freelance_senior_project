import createError from "../utils/createError.js";
import Order from "../models/ordermodel.js";
import Gig from "../models/gigmodel.js";


// export const createOrder=async(req,res,next)=>{
//     try {
//         const gig=await Gig.findById(req.params.gigId);

//         const newOrder=new Order({
//             gigId:gig._id,
//             img:gig.cover,
//             title:gig.title,
//             buyerId:req.userId,
//             sellerId:gig.userId,
//             price:gig.price,
//             payment_intent:"temporary",
//         })
//         await newOrder.save();
//         res.status(200).send("successful");
//     } catch (error) {
//         next(error);
//     }
// }

export const getOrders=async(req,res,next)=>{
    const user=req.userData;
    try {
        const orders=await Order.find({
            ...(user.isSeller ? {sellerId:user._id}:{buyerId:user._id}),
            isCompleted:false,
        })
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
};

