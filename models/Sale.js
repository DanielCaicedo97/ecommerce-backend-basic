import mongoose from "mongoose";

const saleSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    items: {
      type: Array,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
