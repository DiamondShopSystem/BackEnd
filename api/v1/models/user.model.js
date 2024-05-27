const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
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

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;