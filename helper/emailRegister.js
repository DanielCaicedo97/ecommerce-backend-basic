import nodemailer from "nodemailer";

const emailRegister = async ({ email, name, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "DAC - Daniel ECommerce Articles Administrator",
    to: email,
    subject: "Verify Your Account at DAC",
    text: "Verify Your Account at DAC",
    html: `<p>Hello ${name}, please verify your account at DAC.</p>
           <p>Your account is ready, you just need to verify it by clicking the following link:
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Verify Account</a>
           </p>
           <p>If you didn't create this account, you can ignore this message.</p>`,
  });
  // console.log("Message sent: %s", info.messageId);
};

export default emailRegister;
