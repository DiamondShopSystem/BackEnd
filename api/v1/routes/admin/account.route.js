const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");

router.get("/staff" , controller.getStaff);

router.post("/staff/create" , controller.createStaff);

router.get("/staff/detail/:id", controller.detailStaff)

router.get("/staff/edit/:id", controller.getEditStaff);

router.patch("/staff/edit/:id", controller.patchStaff);

router.delete("/staff/delete/:id",
    controller.deleteStaff
);


module.exports = router;