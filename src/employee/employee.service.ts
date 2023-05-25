import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from './employee.entity';
import { Repository } from 'typeorm';
import { EmployeeNotFoundException } from './exceptions/employee-not-found.exception';
import { TaskService } from '../task/task.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private repository: Repository<Employee>,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
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
    const employee = (
      await this.repository.find({
        where: { id: id },
        relations: { tasks: true },
      })
    )[0];

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

  async deleteBy(employeeId: number) {
    await this.taskService.deleteAllBy(employeeId);

    const employee = await this.repository.findOneBy({ id: employeeId });

    if (!employee) {
      throw new EmployeeNotFoundException(employeeId);
    }
    await this.repository.delete({ id: employeeId });
  }
}
