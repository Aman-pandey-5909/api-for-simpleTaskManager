import nodemailer from "nodemailer";
import Useracc from "../models/UserAcc";
import bcryptjs from "bcryptjs";


const sendEmail = async (email, emailType, userId, subject, text) => {
    try {
        const hashedverToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await Useracc.findByIdAndUpdate(userId, {
                isVerified: false,
                verificationToken: hashedverToken,
                verificationTokenExpiry: Date.now() + 3600000,
            }, { new: true });
        }
       
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error in nodeMailer' });
        console.error("Error sending email:", error);
    }
}

export default sendEmail