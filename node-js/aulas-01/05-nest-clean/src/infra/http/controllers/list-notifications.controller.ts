import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ListNotificationsUseCase } from '@/domain/notification/application/use-cases/list-notification'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { NotificationsPresenter } from '../presenters/notifications-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/notifications')
export class ListNotificationsController {
  constructor(private listNotifications: ListNotificationsUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const result = await this.listNotifications.execute({
      page,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const notifications = result.value.notifications

    return { notifications: notifications.map(NotificationsPresenter.toHTTP) }
  }
}
