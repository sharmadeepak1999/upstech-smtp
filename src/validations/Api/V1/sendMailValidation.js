const { body } = require("express-validator");

const sendMailValidationRules = () => {
  return [
    body("to")
      .notEmpty()
      .isEmail()
      .withMessage("Invalid 'to' email address"),

    body("from")
      .notEmpty()
      .isEmail()
      .withMessage("Invalid 'from' email address"),

    body("senderName")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Sender name is required"),

    body("receiverName")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Receiver name is required"),

    body("subject")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Subject is required"),
      
    body("body")
      .notEmpty()
      .withMessage("Body is required")
      .isLength({ min: 1 })
      .withMessage("Body must be at least 1 character long"),
      
    body("templateId")
      .notEmpty()
      .withMessage("Template ID is required")
      .isInt({ min: 1 })
      .withMessage("Template ID must be a valid integer greater than 0")

  ];
};

module.exports = {
  sendMailValidationRules
};