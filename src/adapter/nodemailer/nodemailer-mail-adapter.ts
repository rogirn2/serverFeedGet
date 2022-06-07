import nodemailer from 'nodemailer';
import { MailAdapter, sendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7d3636e31d34e2",
      pass: "e51ece1e402332"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: sendMailData) {
        await transport.sendMail({
            from: 'Rogirn2 <rogirn2@gmail.com>',
            to: 'Igor Brito <rogirn2@gmail.com>',
            subject,
            html: body,
        })
    };
}