import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../../../src/task/task.controller';
import { createMock } from '@golevelup/ts-jest';
import { TaskService } from '../../../src/task/task.service';
import TaskDto from '../../../src/task/dto/task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  describe('add()', () => {
    it('should invoke add method in service to create a task', () => {
      const task: TaskDto = {
        title: 'test',
        description: 'test description',
        dueDate: new Date('2023/02/20'),
        employeeId: 1,
      };

      controller.add(task);

      expect(service.add).toBeCalledWith({ ...task });
    });
  });

  describe('getAll()', () => {
    it('should invoke getAll method in service to get all tasks', () => {
      controller.getAll();

      expect(service.getAll).toBeCalled();
    });
  });

  describe('getBy(taskId)', () => {
    it('should invoke getBy method in service to get a particular tasks', () => {
      controller.getById(1);

      expect(service.getById).toBeCalledWith(1);
    });
  });

  describe('updateBy(id, TaskDto)', () => {
    it('should invoke updateBy method in service to update a task', () => {
      const updateRequest: Partial<TaskDto> = {
        title: 'test',
      };
      controller.updateBy(1, updateRequest);

      expect(service.updateBy).toBeCalledWith(1, updateRequest);
    });
  });

  describe('deleteBy(id)', () => {
    it('should invoke deleteBy method in service to delete a task', () => {
      controller.deleteBy(1);

      expect(service.deleteBy).toBeCalledWith(1);
    });
  });
});
