import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from './employee.entity';
import { Repository } from 'typeorm';
import { EmployeeNotFoundException } from './exceptions/employee-not-found.exception';

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
    return this.repository.find({ relations: { tasks: true } });
  }

  async getBy(id: number): Promise<Employee> {
    const employee = await this.repository.findOneBy({ id: id });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }
    return employee;
  }

  async updateBy(
    id: number,
    updateRequest: Partial<EmployeeDto>,
  ): Promise<Employee> {
    const employee = await this.repository.findOneBy({ id: id });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }
    await this.repository.update({ id: id }, { ...updateRequest });

    return this.repository.findOneBy({ id: id });
  }

  async deleteBy(id: number) {
    const employee = await this.repository.findOneBy({ id: id });

    if (!employee) {
      throw new EmployeeNotFoundException(id);
    }
    await this.repository.delete({ id: id });
  }
}
