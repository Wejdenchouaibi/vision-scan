import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { ScannedObjectService } from './scanned-object.service';
import { CreateScannedObjectDto } from './dto/create-scanned-object.dto';
import { UpdateScannedObjectDto } from './dto/update-scanned-object.dto';
import { ScannedObject } from './entities/scanned-object.entity';
import { extname } from 'path/win32';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('scanned-object')
@UseGuards(JwtAuthGuard)
export class ScannedObjectController {
  constructor(private readonly scannedObjectService: ScannedObjectService) { }

  @Post()
  @UseInterceptors(FileInterceptor("imageUrl", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  async create(@Body() createScannedObjectDto: CreateScannedObjectDto, @UploadedFile() imageUrl, @Request() req) {
    createScannedObjectDto.imageUrl = imageUrl ? imageUrl.filename : null;
    return await this.scannedObjectService.create(createScannedObjectDto, req.user);
  }


  @Get()
  async findAll(@Request() req) {
    return await this.scannedObjectService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.scannedObjectService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor("imageUrl", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  async update(@Param('id') id: string, @Body() updateScannedObjectDto: UpdateScannedObjectDto, @UploadedFile() imageUrl) {
    if (imageUrl) {
      updateScannedObjectDto.imageUrl = imageUrl.filename;
    }
    return await this.scannedObjectService.update(+id, updateScannedObjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.scannedObjectService.remove(+id);
  }
}
