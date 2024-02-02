const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserLoginDetail",
      required: true,
    },

    productToSave: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Clothing",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserCart = mongoose.model("userCart", userCartSchema);

module.exports = UserCart;
