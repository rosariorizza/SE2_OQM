import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from 'src/services/services.module';

describe('Service controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ServicesModule,
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
            migrations: ['/home/rosario/softeng2/SE2_OQM/oqm_ws/migrations/services.sql'],
            migrationsRun: true,
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  afterEach(()=>{

  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/services')
      .expect(200)
      .expect([{description: 'sample description for customer support service', type: 'CUSTOMER_SUPPORT', time: 10},
      {description: 'sample description for technical assistance service', type: 'TECHNICAL_ASSISTANCE', time: 5}]);
  });
});
