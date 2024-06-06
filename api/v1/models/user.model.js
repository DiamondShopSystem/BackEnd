const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        status: String,
        token: {
            type: String,
            unique: true
        }
    },

    {
        timestamps: true,
    }
);

const Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;