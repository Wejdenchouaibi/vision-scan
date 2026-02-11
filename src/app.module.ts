import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ScannedObjectModule } from './scanned-object/scanned-object.module';


@Module({
   imports: [TypeOrmModule.forRoot({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "dejdej54149257",
  database: "vision_scan",
  autoLoadEntities: true, 
  synchronize: true,
}),
 UserModule, ScannedObjectModule],
  controllers: [AppController],
  providers: [AppService, TypeORMError],
})
export class AppModule {}
