import { PartialType } from '@nestjs/mapped-types';
import { CreateScannedObjectDto } from './create-scanned-object.dto';

export class UpdateScannedObjectDto extends PartialType(CreateScannedObjectDto) {}
