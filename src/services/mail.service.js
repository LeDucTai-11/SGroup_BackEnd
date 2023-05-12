import nodemailer from 'nodemailer';

class MailService {
    async sendMail(toAddress,subject,content) {
        try {
            const config = {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            };
    
            const message = {
                from: `${process.env.STMP_USER}`,
                to: toAddress,
                subject: subject,
                text: content
            };
            const transporter = nodemailer.createTransport(config);
            await transporter.sendMail(message);
        }catch(err) {
            console.log(err);
        }
    }
}

export default new MailService();