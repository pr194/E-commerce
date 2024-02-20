import mongoose from "mongoose";
const Productschema = new mongoose.Schema({
 
  name: {
    type: String,
    trim: true,
    required: [true, "please enter Product name"],
  },
  description: {
    type: String,
    required: [true, "please enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "Price cannot be more then 8 character"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter category"],
  },
  stock: {
    type: Number,
    required: [true, "plaese enter product Stock"],
    maxLength: [4, "stock canont be graeter then 4 characters"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: [true, "plaese enter Your name"],
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Product", Productschema);
