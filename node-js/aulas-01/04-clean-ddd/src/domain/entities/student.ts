import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface StudentProps {
  name: string
  createdAt: Date
}
export class Student extends Entity<StudentProps> {
  static create(
    props: Optional<StudentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return student
  }
}
