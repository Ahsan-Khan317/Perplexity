import nodemailer from "nodemailer";
import "../../config/env.js";

// ✅ Create transporter with 10s timeout
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL

  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  },

  // ✅ Force IPv4 (THIS FIXES YOUR ERROR)
  family: 4,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  logger: true,
  debug: true
});

// ✅ Verify connection (runs once when server starts)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Transporter Error:", error.message);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ✅ Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Ahsan" <${process.env.EMAIL}>`,
      to,
      subject,
      html
    });

    console.log("✅ Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;