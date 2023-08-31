const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../env.js');
const validator = require('validator');

const sendMail = (req, res) => {
  const { emailArray, subject, text, html } = req.body;

  // Filter out invalid email addresses
  const validEmails = emailArray.map(email => email.replace(/,+$/, '')).filter(email => (validator.isEmail(email) && email !== ''));

  if (validEmails.length === 0) {
    return res.status(400).json({
      error: 'No valid email addresses provided'
    });
  }
console.log(validEmails);
  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: EMAIL,
    to: validEmails.join(', '),
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html // HTML body
  };

  transporter
  .sendMail(message)
  .then(() => {
    return res.status(201).json({
      msg: 'Emails have been sent successfully',
      validEmails: validEmails
    });
  })
  .catch(error => {
    return res.status(500).json({ error });
  });
};

module.exports = {
  sendMail
};