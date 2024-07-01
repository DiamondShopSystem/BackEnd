const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        fullName:{
            type: String
        },
        status: String,
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt: Date,
        phone: {
            type: String,
            default: ""
        },
        avatar: {
            type:String,
            default: ""
        },
        role_id: String,
    },
    {
        timestamps: true
    }
);

const Accounts = mongoose.model("Accounts", accountsSchema, "accounts");

module.exports = Accounts;