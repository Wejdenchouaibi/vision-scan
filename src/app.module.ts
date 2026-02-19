import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ScannedObjectModule } from './scanned-object/scanned-object.module';
import { User } from './user/entities/user.entity';
import { ScannedObject } from './scanned-object/entities/scanned-object.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, ScannedObject],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ScannedObjectModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, TypeORMError],
})
export class AppModule { }
