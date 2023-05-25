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

      expect(taskRepo.find).toBeCalledWith({
        relations: { employee: true },
      });
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

  describe('updateBy(id, updateRequest)', () => {
    it('should update task by id', async () => {
      const taskId = 1;

      await service.updateBy(taskId, { title: 'test' });

      expect(taskRepo.findOneBy).toBeCalledTimes(2);
      expect(taskRepo.update).toBeCalledWith({ id: taskId }, { title: 'test' });
    });

    it('should update employee assigned to task if employeeId is present', async () => {
      const taskId = 1;
      const employeeId = 2;

      await service.updateBy(taskId, { employeeId: employeeId });

      expect(taskRepo.findOneBy).toBeCalledTimes(1);
      expect(employeeService.getBy).toBeCalledWith(employeeId);
      expect(taskRepo.update).not.toBeCalled();
    });

    it('should throw TaskNotFoundException if requested task is not found', () => {
      taskRepo = createMock<Repository<Task>>({
        findOneBy: () => null,
      });
      const employeeId = 1;

      try {
        service.updateBy(employeeId, { title: 'test' });
      } catch (e) {
        expect(e instanceof TaskNotFoundException).toBe(true);
      }
    });
  });

  describe('deleteBy(id)', () => {
    it('should delete task by id', async () => {
      const taskId = 1;

      await service.deleteBy(taskId);

      expect(taskRepo.findOneBy).toBeCalledTimes(1);
      expect(taskRepo.delete).toBeCalledWith({ id: taskId });
    });

    it('should throw TaskNotFoundException if requested task is not found', () => {
      taskRepo = createMock<Repository<Task>>({
        findOneBy: () => null,
      });
      const taskId = 1;

      try {
        service.deleteBy(taskId);
      } catch (e) {
        expect(e instanceof TaskNotFoundException).toBe(true);
      }
    });
  });

  describe('deleteAllBy(employeeId)', () => {
    it('should delete all tasks by employee id', async () => {
      const employeeId = 1;

      await service.deleteAllBy(employeeId);

      expect(taskRepo.delete).toBeCalledWith({ employee: { id: employeeId } });
    });
  });
});
