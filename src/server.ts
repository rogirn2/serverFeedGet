import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.send("HTTP server running!");
})

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7d3636e31d34e2",
      pass: "e51ece1e402332"
    }
  });

app.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Rogirn2 <rogirn2@gmail.com>',
        to: 'Igor Brito <rogirn2@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('HTTP server running!');
});