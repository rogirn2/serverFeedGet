import express from 'express';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapter/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("HTTP server running!");
})

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter;
    
    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    );

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    })
    
    return res.status(201).send();
})