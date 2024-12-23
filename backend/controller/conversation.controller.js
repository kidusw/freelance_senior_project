import createError from "../utils/createError.js";
import Conversation from "../models/conversationmodel.js";


export const createConversation = async (req, res, next) => {
  const user=req.userData;
  console.log("seller:",user.isSeller);
  console.log("id:",user._id);
  const newConversation = new Conversation({
    id: user.isSeller ? user._id+ req.body.to : req.body.to + req.userId,
    sellerId: user.isSeller ? user._id : req.body.to,
    buyerId: user._id ? req.body.to : user._id,
    readBySeller: user.isSeller,
    readByBuyer: !user.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {
  const user=req.userData;
  try {
    const conversations = await Conversation.find(
      user.isSeller ? { sellerId: user._id } : { buyerId: user._id }
    ).sort({ updatedAt: -1 });
    console.log(conversations);
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};