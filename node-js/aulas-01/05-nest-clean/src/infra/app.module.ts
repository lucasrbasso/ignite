import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { DatabaseModule } from './database/database.module'
import { EnvModule } from '@/infra/env/env.module'
import { EventModule } from './events/events.module'
import { LoggerMiddleware } from './middlewares/logger'
import { LoggerModule } from 'nestjs-pino'
import { randomUUID } from 'node:crypto'
import { colorizerFactory } from 'pino-pretty'
import pino from 'pino'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: 'info',
            redact: config.get<string[]>('logger.redacted.fields'),
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                levelFirst: false,
                translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
                messageFormat: "{pid} - {if req_id}req_id={reqId} trace_id={trace_id} span_id={span_id}{end} {msg}",
                ignore: "pid,hostname,context,req,res,responseTime",
                errorLikeObjectKeys: ['err', 'error'],
              },
            },
            host: '[FORUM-API]',
            autoLogging: false,
            genReqId: (request) => request.headers['x-correlation-id'] || randomUUID(),
          },
        };
      },
    }),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
    EnvModule,
    EventModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
