const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middlewares/admin/verifyJWT");
const controller = require("../../controllers/admin/account.controller");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
// router.use(verifyJWT);

//Staff
router.get("/staff", controller.getStaff);

router.post("/staff/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.createStaff);

router.get("/staff/detail/:id", controller.detailStaff)

router.get("/staff/edit/:id", controller.getEditStaff);

router.patch("/staff/edit/:id", controller.patchStaff);

router.delete("/staff/delete/:id",
    controller.deleteStaff
);

//User
router.get("/customer", controller.getUser);

router.post("/customer/create", controller.createUser);

router.get("/customer/detail/:id", controller.detailUser);

router.get("/customer/edit/:id", controller.getEditUser);

router.patch("/customer/edit/:id", controller.patchUser);

router.delete("/customer/delete/:id",
    controller.deleteUser
);

module.exports = router;