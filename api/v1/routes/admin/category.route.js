const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/admin/authenticateToken.middleware");
const controller = require("../../controllers/admin/category.controller");

router.post("/create", 
    controller.createPost);

router.get("/create", 
    controller.createGet);

router.get("/" , 
    // authenticateToken.authenticateToken, 
    controller.getCategory);

router.get("/detail/:id" , 
    controller.detailCategory );

router.delete("/delete/:id" , 
    controller.deleteCategory)

router.get("/edit/:id", 
    controller.editGetCategory);

router.patch("/edit/:id" , 
    controller.editPatchCategory);

module.exports = router;