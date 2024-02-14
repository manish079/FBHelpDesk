const facebookController = require("../controllers/fb_controller");
const express = require("express");
const router = express.Router();

router.post("/webhook", facebookController.webhooks);
router.get("/getWebhook", facebookController.getWebHook);
