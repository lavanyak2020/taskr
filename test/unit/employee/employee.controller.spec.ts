import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDto } from '../../../src/employee/dto/employee-dto';
import { EmployeeController } from '../../../src/employee/employee.controller';
import { EmployeeService } from '../../../src/employee/employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('add()', () => {
    it('should invoke add method in service to create an employee', () => {
      const employee: EmployeeDto = {
        name: 'test',
        email: 'test@test.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: new Date('2023/02/20'),
      };

      controller.add(employee);

      expect(service.add).toBeCalledWith({ ...employee });
    });
  });

  describe('getAll()', () => {
    it('should invoke getAll method in service to get all employees', () => {
      controller.getAll();

      expect(service.getAll).toBeCalled();
    });
  });
});
