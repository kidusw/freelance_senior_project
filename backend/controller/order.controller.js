import createError from "../utils/createError.js";
import Order from "../models/ordermodel.js";
import Gig from "../models/gigmodel.js";


export const createOrder=async(req,res,next)=>{
    try {
        const gig=await Gig.findById(req.params.gigId);
        const existingOrder = await Order.findOne({ 
            buyerId: req.userId, 
            gigId: req.params.gigId 
        });

        console.log(existingOrder);
        if(existingOrder)  return next(createError(403, "order already exists"));
        const newOrder=new Order({
            gigId:gig._id,
            img:gig.cover,
            title:gig.title,
            buyerId:req.userId,
            sellerId:gig.userId,
            price:gig.price,
            payment_intent:"temporary",
        })
        const order=await newOrder.save();
        console.log(order);
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

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

export const getSingleOrder = async(req,res,next)=>{
    const order_id=req.params.id;
    console.log(order_id);
     try {
         const order=await Order.find({_id:order_id
        })
        console.log(order);
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

export const makePayment =async(req,res,next)=>{
    const order_id=req.params.id
    const data=req.body;
    console.log("user data from payment: ",data);
    try {
        const or= await Order.findOneAndUpdate({_id:order_id},
            {$set:
                {isCompleted:true,payment_intent:"completed",sales:sales+1},
            }
            ,{new:true});
        console.log(or);
        res.status(200).send(or);
    } catch (error) {
        next(error);  
    }
}