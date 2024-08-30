import { createTransport } from "nodemailer";


const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
    },
});

export default transporter;
