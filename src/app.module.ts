import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';



@Module({
   imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"dejdej54149257",
    database:"vision_scan",
    autoLoadEntities:true,
    entities:[__dirname + "/**/*.entities{.ts,.js}"],
    synchronize:true,

  }) , UserModule],
  controllers: [AppController],
  providers: [AppService, TypeORMError],
})
export class AppModule {}
