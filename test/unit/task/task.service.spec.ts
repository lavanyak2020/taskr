import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../../src/task/task.service';
import { Repository } from 'typeorm';
import Task from '../../../src/task/task.entity';
import { createMock } from '@golevelup/ts-jest';
import { EmployeeService } from 'src/employee/employee.service';
import TaskDto from '../../../src/task/dto/task.dto';
import { TaskNotFoundException } from '../../../src/task/exceptions/task-not-found.exception';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepo: Repository<Task>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    taskRepo = createMock<Repository<Task>>();
    employeeService = createMock<EmployeeService>();

    service = new TaskService(taskRepo, employeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('add()', () => {
    it('should add a task and assign to employee', () => {
      const task: TaskDto = {
        title: 'test',
        description: 'test description',
        dueDate: new Date('2023/02/20'),
        employeeId: 1,
      };

      service.add(task);

      expect(taskRepo.create).toBeCalledWith({ ...task });
      expect(employeeService.getBy).toBeCalledWith(task.employeeId);
    });
  });

  describe('getAll()', () => {
    it('should return all tasks', () => {
      service.getAll();

      expect(taskRepo.find).toBeCalledWith({ relations: { employee: true } });
    });
  });

  describe('getBy(taskId)', () => {
    it('should find and return a task', () => {
      service.getById(1);

      expect(taskRepo.find).toBeCalledWith({
        relations: { employee: true },
        where: { id: 1 },
      });
    });

    it('should throw TaskNotFoundException if requested employee is not found', () => {
      taskRepo = createMock<Repository<Task>>({ find: () => null });
      const taskId = 1;

      try {
        service.getById(taskId);
      } catch (e) {
        expect(e instanceof TaskNotFoundException).toBe(true);
      }
    });
  });
});
