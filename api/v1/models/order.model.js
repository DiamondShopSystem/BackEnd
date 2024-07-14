const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number,
                productInfo: Object,
                size: Number
            },
        ],
        fullName: String,
        phoneNumber: String,
        address: String,
        totalPrice: Number,
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)


const Order = mongoose.model("Order", orderSchema, "order");

module.exports = Order;