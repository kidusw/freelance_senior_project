import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import Gig from "../models/gigmodel.js";
import Category from "../models/category.model.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    // Generate a short-lived access token
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );

    // Send the token in an httpOnly cookie

    res.json({ message: "Login successful", user, adminToken: accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getStatus = async (req, res) => {
  try {
    const users = await User.find().countDocuments();
    const sellers = await User.find({ isSeller: true }).countDocuments();
    const categories = await Category.countDocuments();
    res.send({
      status: "success",
      values: {
        users,
        sellers,
        categories,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "Fail",
      error: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isSeller: false });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).send({
    message: `${user.username} is deleted`,
  });
};

const getSellers = async (req, res) => {
  try {
    const users = await User.find({ isSeller: true });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name -_id");

    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
const addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.category,
  });
  await category.save();
  res.status(201).send(category);
};
const deleteCategory = async (req, res) => {
  const category = await Category.findOneAndDelete({ name: req.body.name });
  res.status(200).send({
    message: `${category} is deleted`,
  });
};
export {
  getStatus,
  login,
  getUsers,
  getSellers,
  deleteUser,
  getCategories,
  deleteCategory,
  addCategory,
};
