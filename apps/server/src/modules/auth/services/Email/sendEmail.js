import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

const from = "onboarding@resend.dev";

const sendEmail = async function ({ to, subject, html, text }) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Error sending email:", error);

      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: `Email successfully sent to ${to}`,
      data,
    };
  } catch (error) {
    console.error("Email send failed:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export default sendEmail;
