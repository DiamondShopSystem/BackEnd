const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/payment.controller");


router.post("/callback", controller.callback);

router.post("/zalo", controller.paymentZalo);

router.post("/zalo/callback", controller.callbackZalo);

router.post("/zalo/order-status/:app_trans_id", controller.checkStatusZalo);

router.get("/redirect-from-zalopay", controller.redirectZalo);

router.post("/cod", controller.paymentCod);
module.exports = router;