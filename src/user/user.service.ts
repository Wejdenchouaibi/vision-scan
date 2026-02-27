import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }


  async create(createUserDto: CreateUserDto): Promise<User> {
    const newuser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newuser);
  }
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }


  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find()
    if (user.length == 0) {
      throw new NotFoundException("data not found")
    }
    return user
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User > {
    const user= await this.userRepository.findOneBy({ email });
    if(!user){
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
  async updateToken(id: any, token: string) {
    const user = await this.userRepository.update(id, {
      refreshToken: token,
    });
    if (user.affected == 0) {
      throw new NotFoundException('user not found !');
    }
    return this.userRepository.findOne({ where: { id } });
  }
  async updatePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const matching = await argon2.verify(user.password, oldPassword);
    if (!matching) {
      throw new BadRequestException('old password is incorrect');
    }
    user.password= newPassword;
    await this.userRepository.save(user);
    return {
      success: true,
      message: 'password updated successfully',
    };
  }
}
