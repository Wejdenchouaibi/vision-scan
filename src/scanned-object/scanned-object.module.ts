import { Module } from '@nestjs/common';
import { ScannedObjectService } from './scanned-object.service';
import { ScannedObjectController } from './scanned-object.controller';
import { ScannedObject } from './entities/scanned-object.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ScannedObject , User])],
  controllers: [ScannedObjectController],
  providers: [ScannedObjectService],
})
export class ScannedObjectModule {}
