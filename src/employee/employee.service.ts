import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee-dto';

@Injectable()
export class EmployeeService {
  add(employeeDto: EmployeeDto): EmployeeDto {
    return employeeDto;
  }
}
