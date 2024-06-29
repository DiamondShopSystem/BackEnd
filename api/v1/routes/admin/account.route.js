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

module.exports = router;