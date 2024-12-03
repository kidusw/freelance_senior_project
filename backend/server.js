import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js"
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/message.route.js";
import cors from "cors";
import bodyParser from "body-parser";
const app=express();
dotenv.config();


app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser())
app.use(cookieParser());



const connectDb=async()=>{
    try {
    await mongoose.connect(process.env.MONGO_STRING);
    console.log("connected to mongodb");
} catch (error) { 
    console.log(error);
}
}



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);





app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "something went wrong";

    return res.status(errorStatus).send(errorMessage);
})


app.listen(8700,()=>{
    connectDb();
    console.log("server is runnnig on port 8700");
})