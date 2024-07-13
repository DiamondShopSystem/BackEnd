const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middlewares/client/verifyJWT");
const controller = require("../../controllers/client/cart.controller");


// router.use(verifyJWT);

router.get("/get", controller.index);

router.post("/add", controller.addPost);

router.delete("/delete/:productId", controller.deleteItem);
module.exports = router;