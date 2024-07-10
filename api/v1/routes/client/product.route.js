const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");


// router.get("/", controller.index);

// router.get("/:slug", controller.detail);

router.get("/products/:slugCategory", controller.category);

router.get("/:id", controller.productDetail);

module.exports = router;