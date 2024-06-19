const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
    title: String,
    category: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    thumbnail: String,
    status: {
        type: String,
        default: "active",
    },
    price: Number,
    size: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        default: ""
    },
    deletedAt: Date,
    price: Number,
    stock: Number,
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;