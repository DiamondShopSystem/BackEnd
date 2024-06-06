const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/category.controller");

router.post("/create", controller.createPost);

router.get("/" , controller.getCategory);

router.get("/detail/:id" , controller.detailCategory );

router.delete("/delete/:id" , controller.deleteCategory)

router.get("/edit/:id", controller.editGetCategory);

router.patch("/edit/:id" , controller.editPatchCategory);




module.exports = router;