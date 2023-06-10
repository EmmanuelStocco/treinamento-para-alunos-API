import { roleMiddleware } from "../middlewares/roleMiddleware"
import { NextFunction, Request, Response } from 'express'

export const middlewareHandler = (roleRoute?: 'public' | 'admin') => (req: Request, res: Response, next: NextFunction) =>
    roleMiddleware({ req, res, next, roleRoute })
