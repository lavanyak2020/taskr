import { Inject, Injectable, forwardRef } from '@nestjs/common';
import TaskDto from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Task from './task.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { TaskNotFoundException } from './exceptions/task-not-found.exception';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
  ) {}

  async add(request: TaskDto): Promise<Task> {
    const task = this.taskRepo.create({ ...request });
    const employee = await this.employeeService.getBy(request.employeeId);
    task.employee = employee;
    await this.taskRepo.save(task);
    return task;
  }

  getAll(): Promise<Task[]> {
    return this.taskRepo.find({ relations: { employee: true } });
  }

  async getById(id: number): Promise<Task> {
    const task = (
      await this.taskRepo.find({
        where: { id: id },
        relations: { employee: true },
      })
    )[0];

    if (!task) {
      throw new TaskNotFoundException(id);
    }
    return task;
  }

  async updateBy(id: number, updateRequest: Partial<TaskDto>): Promise<Task> {
    let task = await this.taskRepo.findOneBy({ id: id });
    const { employeeId, ...taskProps } = updateRequest;
    if (employeeId) {
      const employee = await this.employeeService.getBy(employeeId);
      task.employee = employee;
      await this.taskRepo.save(task);
    }

    if (!task) {
      throw new TaskNotFoundException(id);
    }

    if (Object.keys(taskProps).length > 0) {
      await this.taskRepo.update({ id: id }, { ...taskProps });
      task = await this.taskRepo.findOneBy({ id: id });
    }

    return task;
  }

  async deleteBy(id: number) {
    const employee = await this.taskRepo.findOneBy({ id: id });

    if (!employee) {
      throw new TaskNotFoundException(id);
    }
    await this.taskRepo.delete({ id: id });
  }

  async deleteAllBy(employeeId: number) {
    await this.taskRepo.delete({
      employee: { id: employeeId },
    });
  }
}
