const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");

// router.post("/create" , controller.createRole);

router.post("/create" , controller.createRole);


module.exports = router;