import nodemailer from "nodemailer";
import "../../config/env.js";

// ✅ Create transporter with 10s timeout
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD // 🔥 App Password (NOT normal password)
  },

  // ✅ Prevent instant crash (wait 10 seconds)
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  // ✅ Debugging (optional but helpful)
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