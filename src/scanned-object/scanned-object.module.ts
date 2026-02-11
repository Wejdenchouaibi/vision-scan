import { Module } from '@nestjs/common';
import { ScannedObjectService } from './scanned-object.service';
import { ScannedObjectController } from './scanned-object.controller';
import { ScannedObject } from './entities/scanned-object.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ScannedObject])],
  controllers: [ScannedObjectController],
  providers: [ScannedObjectService],
})
export class ScannedObjectModule {}
