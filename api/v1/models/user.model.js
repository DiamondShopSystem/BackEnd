const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        status:{
            type: String,
            default: "active"
        },
        token: {
            type: String,
            unique: true
        },
        deleted: {
            type:Boolean,
            default:false
        },
        fullName: {
            type: String
        }
    },

    {
        timestamps: true,
    }
);

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;