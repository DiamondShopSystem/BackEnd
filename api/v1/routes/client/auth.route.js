const express = require("express");
const router = express.Router();
const authController = require("../../controllers/client/auth.controller");

router.post("/user/login" ,  authController.loginPost);

module.exports = router;