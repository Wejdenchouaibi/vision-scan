import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ScannedObjectService } from './scanned-object.service';
import { CreateScannedObjectDto } from './dto/create-scanned-object.dto';
import { UpdateScannedObjectDto } from './dto/update-scanned-object.dto';
import express from 'express';
import { ScannedObject } from './entities/scanned-object.entity';
@Controller('scanned-object')
export class ScannedObjectController {
  constructor(private readonly scannedObjectService: ScannedObjectService) {}

  @Post()
  async create(@Body() createScannedObjectDto: CreateScannedObjectDto, @Res() response: express.Response) {
    try {
      const result = await this.scannedObjectService.create(createScannedObjectDto);
      response.status(201).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Error creating scanned object', error });
    }
  }


  @Get()
  async findAll(@Res() response: express.Response) {
    try {
      const result = await this.scannedObjectService.findAll();
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Error fetching scanned objects', error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: express.Response) {
    try {
      const result = await this.scannedObjectService.findOne(+id);
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Error fetching scanned object', error });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateScannedObjectDto: UpdateScannedObjectDto, @Res() response: express.Response) {
    try {
      const result = await this.scannedObjectService.update(+id, updateScannedObjectDto);
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Error updating scanned object', error });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: express.Response) {
    try {
      const result = await this.scannedObjectService.remove(+id);
      response.status(200).json(result);
    } catch (error) {
      response.status(500).json({ message: 'Error removing scanned object', error });
    }
  }
}
