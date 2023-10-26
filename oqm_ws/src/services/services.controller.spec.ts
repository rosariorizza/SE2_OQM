import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ServicesController', () => {
  let controller: ServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [ServicesService],


      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
            `env/${process.env.NODE_ENV || 'local'}.env`,
            'env/default.env',
          ],
        }),
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
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
            migrationsRun: true,
          }),
          inject: [ConfigService],
        }),
      ],
      
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
