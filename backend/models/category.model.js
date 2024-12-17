import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', catSchema);
export default Category;
