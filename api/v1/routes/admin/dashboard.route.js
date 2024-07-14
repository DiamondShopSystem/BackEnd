const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");

// router.post("/create" , controller.createRole);

router.get("/" , controller.index);


module.exports = router;