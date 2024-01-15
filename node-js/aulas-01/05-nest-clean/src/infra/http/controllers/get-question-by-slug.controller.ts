import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

const slugQueryParamSchema = z.string()

const queryValidationPipe = new ZodValidationPipe(slugQueryParamSchema)

type SlugQueryParamSchema = z.infer<typeof slugQueryParamSchema>

@Controller('/questions')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Query('slug', queryValidationPipe) slug: SlugQueryParamSchema) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message)
    }

    const question = result.value.question

    return { question }
  }
}
