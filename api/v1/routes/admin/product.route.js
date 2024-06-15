const express = require("express");
const router = express.Router();
const multer = require('multer');
const controller = require("../../controllers/admin/product.controller");
const upload = multer();
const uploadCloud = require("../../middlewares/uploadCloud.middleware");

router.get("/", controller.getProduct);

router.post("/create",
    upload.single("thumnail"),
    uploadCloud.uploadSingle,
    controller.createProduct
);

router.delete("/delete/:id", controller.deleteProduct)

router.get("/detail/:id", controller.detailProduct);

module.exports = router;