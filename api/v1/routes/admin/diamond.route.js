const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/diamond.controller");


router.get("/", controller.index);

router.get("/create",
    controller.createGet);

router.post("/create", 
    upload.single("thumbnail"),
    // upload.single("ceftificate"),
    uploadCloud.uploadSingle,
    controller.createDiamond);

module.exports = router;