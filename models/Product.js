import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
