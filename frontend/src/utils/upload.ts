 import axios from "axios";
 const upload=async(file:any)=>{
    const data=new FormData();
    data.append('file',file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "freelance");
  try {
    const res=await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,data);
    const {url} = res.data;
    return url;
  } catch (error) {
    console.log(error); 
  }
  }

export default upload;