import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ScannedObject } from 'src/scanned-object/entities/scanned-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User , ScannedObject])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }