import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee-dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post()
  add(@Body() request: EmployeeDto): EmployeeDto {
    return this.service.add(request);
  }
}
