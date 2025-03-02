import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail = async (to: string, html: string , from:string ,subject:string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production", // true for port 465, false for other ports
        auth: {
            user: config.smtp_user,
            pass: config.smtp_pass
        },
    });
    await transporter.sendMail({
        from: from, // sender address
        to,
        subject: subject, // Subject line
        text: "Re-Market", // plain text body
        html
    });


}