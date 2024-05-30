const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("User", userSchema, "users");

module.exports = User;