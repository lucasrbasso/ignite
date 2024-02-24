import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { EnvService } from '@/infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('Forum api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Accounts')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
