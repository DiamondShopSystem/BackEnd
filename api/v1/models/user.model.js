const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false
        },
        fullName: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "user");

module.exports = User;