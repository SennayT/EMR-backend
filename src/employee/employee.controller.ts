import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateUserWithRoleDto, UpdateUserDto } from '../user/dto';
import { JwtGuard } from '../auth/guard';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  // @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(@Body() userDto: CreateUserWithRoleDto, @Request() req) {
    // if (!image) {
    //   throw new BadRequestException('The image is required');
    // }
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.employeeService.create(userDto, user.id);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.employeeService.updateEmployee(id, body);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}
