import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScannedObjectDto } from './dto/create-scanned-object.dto';
import { UpdateScannedObjectDto } from './dto/update-scanned-object.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScannedObject } from './entities/scanned-object.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ScannedObjectService {
  constructor(
    @InjectRepository(ScannedObject)
    private scannedObjectRepository: Repository<ScannedObject>,
          @InjectRepository(User)
  private userRepository: Repository<User>,

  ) { }

  async create(createScannedObjectDto: CreateScannedObjectDto) {
    const user=await this.userRepository.findOne({where:{id:createScannedObjectDto.user}, relations:['scannedObjects']});
    if (!user) {
      throw new NotFoundException(`User with ID ${createScannedObjectDto.user} not found`);
    }

    const scannedObject = this.scannedObjectRepository.create({
      ...createScannedObjectDto,
      user : user
    });
    return await this.scannedObjectRepository.save(scannedObject);
  }

  async findAll(user: User): Promise<ScannedObject[]> {
    const scannedObjects = await this.scannedObjectRepository.find({
relations: ['user'],   });
    // Return empty array instead of error if no objects found, common pattern
    return scannedObjects;
  }

  async findOne(id: number): Promise<ScannedObject> {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new NotFoundException(`Scanned object with ID ${id} not found`);
    }
    return scannedObject;
  }

  async update(id: number, updateScannedObjectDto: UpdateScannedObjectDto) {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new NotFoundException(`Scanned object with ID ${id} not found`);
    }
    Object.assign(scannedObject, updateScannedObjectDto);
    return await this.scannedObjectRepository.save(scannedObject);
  }

  async remove(id: number) {
    const scannedObject = await this.scannedObjectRepository.findOneBy({ id });
    if (!scannedObject) {
      throw new NotFoundException(`Scanned object with ID ${id} not found`);
    }
    return await this.scannedObjectRepository.delete(id);
  }
}

