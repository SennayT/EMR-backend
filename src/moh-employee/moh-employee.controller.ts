import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { CreateMohEmployeeDto } from './dto';
import { UpdateUserDto } from 'src/user/dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
@Controller('moh-employee')
export class MohEmployeeController {
  constructor(private readonly mohEmployeeService: MohEmployeeService) {}

  @Post()
  // @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(
    @Body() createMohEmployeeDto: CreateMohEmployeeDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.mohEmployeeService.create(createMohEmployeeDto, user.id);
  }

  @Get()
  findAll() {
    return this.mohEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mohEmployeeService.findOne(+id);
  }

  @Get('/number')
  getAllNum() {
    return this.mohEmployeeService.getNumOfMohEmployees();
  }

  @Put(':id')
  updateMohEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.mohEmployeeService.updateMohEmployee(id, body);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMohEmployeeDto: UpdateMohEmployeeDto,
  // ) {
  //   return this.mohEmployeeService.update(+id, updateMohEmployeeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mohEmployeeService.remove(+id);
  // }
}
