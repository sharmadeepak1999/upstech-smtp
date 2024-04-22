const express = require("express");
const router = express.Router();

const sendMailController = require("../controllers/Api/V1/sendMailController");

const {
  sendMailValidationRules
} = require("../validations/Api/V1/sendMailValidation")

router.post(
  "/send-email",
  sendMailValidationRules(),
  sendMailController.sendMail
);

module.exports = router;
