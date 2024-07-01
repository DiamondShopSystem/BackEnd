const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");

//Staff
router.get("/staff" , controller.getStaff);

router.post("/staff/create" , controller.createStaff);

router.get("/staff/detail/:id", controller.detailStaff)

router.get("/staff/edit/:id", controller.getEditStaff);

router.patch("/staff/edit/:id", controller.patchStaff);

router.delete("/staff/delete/:id",
    controller.deleteStaff
);

//User
router.get("/user", controller.getUser);

router.post("/user/create" , controller.createUser);

router.get("/user/detail/:id", controller.detailUser);

router.get("/user/edit/:id", controller.getEditUser);

router.patch("/user/edit/:id", controller.patchUser);

router.delete("/user/delete/:id",
    controller.deleteUser
);

module.exports = router;