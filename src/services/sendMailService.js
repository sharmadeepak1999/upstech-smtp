const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

const sendMailService = async ({from, to, subject, html}) => {
    try {
        const mailOptions = {
            from,
            to,
            subject,
            html
        };    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
      } catch (error) {
        console.error('Error sending email:', error);
        return null;
      }
    
}

module.exports = sendMailService
