const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number,
            },
        ],
        totalPrice: Number
    },
    {
        timestamps: true,
    },
    { strict: false }
);

const Cart = mongoose.model("Cart", cartSchema, "cart");

module.exports = Cart;