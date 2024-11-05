const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendConfirmationEmail = async (user) => {
    const filePath = path.join(__dirname, '../templates/verificationTemplate.html');

    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace('{{firstName}}', user.firstName).replace('{{lastName}}', user.lastName).replace('{{verificationCode}}', user.verificationCode);

    const mailOptions = {
        to: user.email,
        subject: 'Account Verification',
        html: html,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };