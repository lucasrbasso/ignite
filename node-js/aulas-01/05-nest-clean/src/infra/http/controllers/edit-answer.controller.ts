import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

const EditAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})
const bodyValidationPipe = new ZodValidationPipe(EditAnswerBodySchema)
type EditAnswerBodySchema = z.infer<typeof EditAnswerBodySchema>

const idParamSchema = z.string()
const paramValidationPipe = new ZodValidationPipe(idParamSchema)

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id', paramValidationPipe) answerId: string,
  ) {
    const { content, attachments } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      answerId,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
