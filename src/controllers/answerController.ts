import { Request, Response } from 'express'
import { answerRepository } from '../repositories/answerRepository'
export class AnswerController {
    async create(req: Request, res: Response) {
        try {
            const { description, userId, postId } = req.body
            const answer = answerRepository.create({
                description,
                post: postId,
                user: userId
            })
            await answerRepository.save(answer)
            return res.status(201).json(answer)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}

