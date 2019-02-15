const express = require('express');
const router = express.Router();
const {HOST} = require('../config/keys');
const nodemailer = require('nodemailer');

router.post('/send', (req, res) => {
    const output = `
      <p>Dear Guest</p>
      <h3>You are invited to my party </h3>
      <h3> ${HOST}/auth/google </h3>
      <h3> have fun </h3>
    `;


let transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'simplysimplyan@gmail.com',
        pass: 'simply789'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let mailOptions = {
  from: '"simply simplyan" simplysimplyan@gmail.com', // sender address
  to: req.body.emails, // list of receivers
  subject: 'Node Contact Request', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

// send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  });

  module.exports = router;