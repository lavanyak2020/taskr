import { Injectable } from '@nestjs/common';
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
}
