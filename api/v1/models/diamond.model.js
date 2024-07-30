const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const diamondSchema = new mongoose.Schema({
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
    clarity: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    cut: {
        type: String,
        default: ""
    },
    certificate: {
        type: String,
        default: ""
    },
    deleted: {
        type: Boolean,
        default: false
    },
    thumbnail: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "active",
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 1
    },
    deletedAt: Date,
}, {
    timestamps: true
});

const Diamond = mongoose.model("Diamond", diamondSchema, "diamond");

module.exports = Diamond;