const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const categorySchema = new mongoose.Schema({
    title: String,
    parent_id:{
        type: String,
        default: "",
    },
    slug:{
        type: String,
        slug:"title",
        unique: true
    },
    children:{
        type: Object,
        default: []
    },
    parentTitle:{
        type:String,
        default: ""
    },
    description: String,
    thumnail: {
        type:String,
        default: ""
    },
    status: {
        type: String,
        default: "active",
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,

},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema, "category");

module.exports = Category;