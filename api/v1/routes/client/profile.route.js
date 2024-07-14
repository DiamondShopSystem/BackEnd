const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/profile.controller");

router.get("/info", controller.index);

router.patch("/info" , controller.patchInfo);

module.exports = router;