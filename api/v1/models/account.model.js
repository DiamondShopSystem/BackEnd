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
        firstName: String,
        lastName: String,
        status: String,
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt: Date,
        phone: String,
        avatar: String,
        role_id: String,
        token: String
    },
    {
        timestamps: true
    }
);

const Accounts = mongoose.model("Accounts", accountsSchema, "accounts");

module.exports = Accounts;