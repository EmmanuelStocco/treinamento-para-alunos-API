import { Request, Response } from 'express'
import { postRepository } from '../repositories/postRepository'

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const { title, description, userId } = req.body
            const post = postRepository.create({
                title,
                description,
                user: userId
            })
            await postRepository.save(post)
            return res.status(201).json(post)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}

