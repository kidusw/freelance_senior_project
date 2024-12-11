import User from "../models/usermodel.js"
import createError from "../utils/createError.js";


export const deleteUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    
        if(req.userId!==user._id.toString()){
           return next(createError(403,"You can change only your account"));
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('deleted successfuly')

}

export const getUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
        
        res.status(200).send(user)
      
}

export const editUser=async(req,res)=>{
 
  const { username, email, img } = req.body;

  try {
    const updatedFields = {};
    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (img) updatedFields.img = img;

    const user = await User.findByIdAndUpdate(
      req.userData._id,
      { $set: updatedFields },
      { new: true, runValidators: true } 
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
