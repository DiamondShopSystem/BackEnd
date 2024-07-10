const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/auth.controller");

router.post("/login/verify/otp" ,  controller.login);

router.get("/auth/refresh", controller.refreshToken);

router.get("/logout", controller.logout );


module.exports = router;