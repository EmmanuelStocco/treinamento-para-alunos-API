import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
            role,
            location
        } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const userNameExist = await userRepository.findOneBy({ name })


        if (userNameExist) {
            throw new BadRequestError('Username já está sendo usado')
        }

        if (!!name == false || !!email == false || !!password == false) {
            throw new BadRequestError('Preencha corretamente os campos!')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            role,
            location,
            password: hashPassword
        })

        await userRepository.save(newUser)

        const { password: _, ...user } = newUser

        return res.status(200).json(user)
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        let user
        user = await userRepository.findOneBy({ email })

        if (!user) {
            user = await userRepository.findOneBy({ name: email })
        }

        if (!user) {
            throw new BadRequestError('E-mail ou senha inválidos')
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if (!verifyPass) {
            throw new BadRequestError('E-mail ou senha inválidos')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        })

        const { password: _, ...userLogin } = user

        return res.json({
            user: userLogin,
            token: token,
        })
    }

    async getProfile(req: Request, res: Response) {
        return res.json(req.user)
    }

    async all(req: Request, res: Response) {
        const allUsers = await userRepository.find()
        console.log('allUsers', allUsers)
        return res.status(200).json(allUsers)
    }
}

