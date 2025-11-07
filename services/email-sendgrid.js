const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOtpEmail(to, otp) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: 'Your OTP code',
    text: `Your OTP is ${otp}. It expires in ${process.env.OTP_TTL_SECONDS/60} minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. It expires in ${process.env.OTP_TTL_SECONDS/60} minutes.</p>`
  };
  return sgMail.send(msg);
}

module.exports = { sendOtpEmail };
