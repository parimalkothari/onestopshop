import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["cash", "upi", "creditcard"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "cash on delivery", "pending"],
      required: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "out for delivery"],
      default: "pending",
    },
    shippingAddress: {
      addressline1: {
        type: String,
        required: true,
      },
      addressline2: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = new mongoose.model("Order", orderSchema);

export default Order;
