const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");

router.get("/" , controller.getAccount);

router.post("/create" , controller.createPost);


module.exports = router;