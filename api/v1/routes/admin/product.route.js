const express = require("express");
const router = express.Router();
const multer = require('multer');
const controller = require("../../controllers/admin/product.controller");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.getProduct);

router.get("/create", controller.createGet  )

router.post("/create",
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    controller.createProduct
);

router.delete("/delete/:id", controller.deleteProduct)

router.get("/detail/:id", controller.detailProduct);

router.get("/edit/:id", controller.editGetProduct);

router.patch("/edit/:id" , 
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    controller.editPatchProduct);

module.exports = router;