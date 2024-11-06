import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

const app=express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());


const connectDb=async()=>{
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
} catch (error) {
    console.log(error);
}
}



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);




app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "something went wrong";

    return res.status(errorStatus).send(errorMessage);
})


app.listen(8700,()=>{
    connectDb();
    console.log("server is runnnig on port 8700");
})