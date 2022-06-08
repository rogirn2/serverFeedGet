import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'IDEA',
            comment: 'I have an idea',
            screenshot: 'data:image/png;base64,329i9i9if9i9dias9kamsdsdasd9d',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'I have an idea',
            screenshot: 'data:image/png;base64,329i9i9if9i9dias9kamsdsdasd9d',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'IDEA',
            comment: '',
            screenshot: 'data:image/png;base64,329i9i9if9i9dias9kamsdsdasd9d',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with a incorrect screenshot format', async () => {
        await expect(submitFeedback.execute({
            type: 'IDEA',
            comment: 'I have an idea',
            screenshot: 'teste.png',
        })).rejects.toThrow();
    });
});