const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  rating: {
    type: Number,
    required: [true, "product rating must be provided"],
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "marcos", "caressa", "liddy"],
      message: "{VALUE} not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
