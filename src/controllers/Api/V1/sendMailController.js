const { validationResult } = require("express-validator");
const Template = require("../../../models/template")
const sendMailService = require("../../../services/sendMailService")
const Handlebars = require('handlebars');

const sendMailController = {
  sendMail: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: errors.array(),
          status_code: 400
        });
      }

      const { to, from, senderName, receiverName, subject, body, templateId } = req.body;

      const [rows] = await Template.findById(templateId)
      if(!rows.length) {
        return res.status(404).json({
          status: "Email template not found!",
          status_code: 404
        })
      }
      const emailTemplate = rows[0].template

      const handlebarsEmailTemplate = Handlebars.compile(emailTemplate);

      const renderedEmail = handlebarsEmailTemplate({ senderName, receiverName, body });
  
      const sentEmail = await sendMailService({ to, from, subject, html: renderedEmail })

      if(!sentEmail) {
        return res.status(400).json({
          status: "Unable to send email!!",
          status_code: 400
        })
      }

      res.status(200).json({ 
        message: "Email sent successfully!",
        status_code: 200
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "Unable to send email!",
        status_code: 500
      });
    }
  }
};

module.exports = sendMailController;
