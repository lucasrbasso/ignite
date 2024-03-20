import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AuthenticateDTO } from '../swagger-dtos/authenticate.dto'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>
@Controller('/sessions')
export class AuthenticateController {
  private readonly logger = new Logger('AuthenticateController')

  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @ApiOperation({
    summary: 'Authenticate',
    description: 'Authenticate with credentials',
    tags: ['Sessions'],
  })
  @ApiBody({
    type: AuthenticateDTO,
    description: 'Required body for authenticate.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @Public()
  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value
      this.logger.error(
        `error m=handle c=AuthenticateController message=${error.message}`,
      )

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
