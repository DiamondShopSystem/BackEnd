const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    category_id: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    mainGemStone: {
        type: Array,
        default: []
    },
    secondGemStone: {
        type: Array,
        default: []
    },
    material: {
        type: Array,
        default: []
    },
    size: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    thumbnail: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active",
    },
    price: {
        type: Number,
        default: 1
    },
    deleted: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        default: ""
    },
    deletedAt: Date,
    stock: Number,
    isHighlight: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;