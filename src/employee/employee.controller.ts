import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee-dto';
import Employee from './employee.entity';

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
}
