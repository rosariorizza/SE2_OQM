import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueManagementModule } from './queue-management/queue-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `env/${process.env.NODE_ENV || 'local'}.env`,
        'env/default.env',
      ],
    }),
    ServicesModule,
    UsersModule,
    ServicesModule,
    QueueManagementModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          { path: 'users', module: UsersModule },
          { path: 'services', module: ServicesModule },
          { path: 'queue-management', module: QueueManagementModule},
        ],
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST_DB'),
        port: +configService.get('PORT_DB'),
        username: configService.get('USERNAME_DB'),
        password: configService.get('PASSWORD_DB'),
        database: configService.get('NAME_DB'),
        logging: configService.get('TYPEORM_LOGGING'),
        entities: [configService.get('TYPEORM_ENTITIES')],
        synchronize: configService.get('TYPEORM_SYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
