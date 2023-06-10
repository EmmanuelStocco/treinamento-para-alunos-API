import { AppDataSource } from '../data-source'
import { Answer } from '../entities/Answers'

export const answerRepository = AppDataSource.getRepository(Answer)
