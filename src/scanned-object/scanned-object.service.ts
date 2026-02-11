import { Injectable } from '@nestjs/common';
import { CreateScannedObjectDto } from './dto/create-scanned-object.dto';
import { UpdateScannedObjectDto } from './dto/update-scanned-object.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScannedObject } from './entities/scanned-object.entity';

@Injectable()
export class ScannedObjectService {
  constructor(
    @InjectRepository(ScannedObject)
    private scannedObjectRepository: Repository<ScannedObject>,
  ) {}
  async create(createScannedObjectDto: CreateScannedObjectDto) {
    const scannedObject = this.scannedObjectRepository.create(createScannedObjectDto);
    return await this.scannedObjectRepository.save(scannedObject);
  }

  async findAll(): Promise<ScannedObject[]> {
    const scannedObjects = await this.scannedObjectRepository.find();
    if (scannedObjects.length === 0) {
      throw new Error('No scanned objects found');
    }
    return scannedObjects;
  }

  async findOne(id: number): Promise<ScannedObject> {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new Error('Scanned object not found');
    }
    return scannedObject;
  }

  async update(id: number, updateScannedObjectDto: UpdateScannedObjectDto) {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new Error('Scanned object not found');
    }
    return await this.scannedObjectRepository.save(scannedObject);
  }

  async remove(id: number) {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new Error('Scanned object not found');
    }
    return await this.scannedObjectRepository.delete(scannedObject);
  }
}
