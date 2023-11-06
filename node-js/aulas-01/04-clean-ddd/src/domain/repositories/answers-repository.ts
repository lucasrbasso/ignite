import { Answer } from '../entities/Answer.1'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
