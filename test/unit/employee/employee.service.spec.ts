import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../../../src/employee/employee.service';
import { EmployeeDto } from '../../../src/employee/dto/employee-dto';
import { createMock } from '@golevelup/ts-jest';
import Employee from 'src/employee/employee.entity';
import { Repository } from 'typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repo: Repository<Employee>;

  beforeEach(async () => {
    repo = createMock<Repository<Employee>>();

    service = new EmployeeService(repo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('add()', () => {
    it('should return employee', () => {
      const employee: EmployeeDto = {
        name: 'test',
        email: 'test@test.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: new Date('2023/02/20'),
      };

      const response = service.add(employee);

      expect(repo.create).toBeCalledWith({ ...employee });
    });
  });

  describe('getAll()', () => {
    it('should return all employees', () => {
      service.getAll();

      expect(repo.find).toBeCalled();
    });
  });
});
