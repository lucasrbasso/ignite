import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) => {
  const question = Question.create(
    {
      title: faker.lorem.sentence(5),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
