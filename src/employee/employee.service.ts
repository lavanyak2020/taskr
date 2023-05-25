import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee-dto';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private repository: Repository<Employee>,
  ) {}

  async add(employeeDto: EmployeeDto): Promise<Employee> {
    const e = this.repository.create({
      name: employeeDto.name,
      email: employeeDto.email,
      phone: employeeDto.phone,
      hireDate: employeeDto.hireDate,
      position: employeeDto.position,
    });
    await this.repository.save(e);
    return e;
  }

  getAll(): Promise<Employee[]> {
    return this.repository.find();
  }
}
