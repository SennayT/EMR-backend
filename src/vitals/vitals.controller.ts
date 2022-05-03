import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalsDto } from './dto';

@Controller('vitals')
export class VitalsController {
  constructor(private vitalsService: VitalsService) {}

  @Get()
  getAll() {
    return this.vitalsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.getVital(id);
  }

  @Post()
  create(@Body() body: VitalsDto) {
    return this.vitalsService.createVital(body);
  }
}