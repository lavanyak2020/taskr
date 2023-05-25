import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee-dto';
import Employee from './employee.entity';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post()
  add(@Body() request: EmployeeDto): Promise<Employee> {
    return this.service.add(request);
  }

  @Get()
  getAll(): Promise<Employee[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  getBy(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ): Promise<Employee> {
    return this.service.getBy(id);
  }
}
