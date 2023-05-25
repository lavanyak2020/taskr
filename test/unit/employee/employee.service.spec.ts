import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../../../src/employee/employee.service';
import { EmployeeDto } from '../../../src/employee/dto/employee.dto';
import { createMock } from '@golevelup/ts-jest';
import Employee from 'src/employee/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeNotFoundException } from '../../../src/employee/exceptions/employee-not-found.exception';

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

      expect(repo.find).toBeCalledWith({ relations: { tasks: true } });
    });
  });

  describe('getBy(id)', () => {
    it('should find employee by id', () => {
      const employeeId = 1;

      service.getBy(employeeId);

      expect(repo.findOneBy).toBeCalledWith({ id: employeeId });
    });

    it('should throw EmployeeNotFoundException if requested employee is not found', () => {
      repo = createMock<Repository<Employee>>({ findOneBy: () => null });
      const employeeId = 1;

      try {
        service.getBy(employeeId);
      } catch (e) {
        expect(e instanceof EmployeeNotFoundException).toBe(true);
      }
    });
  });

  describe('updateBy(id, updateRequest)', () => {
    it('should update employee by id', async () => {
      const employeeId = 1;

      await service.updateBy(employeeId, { name: 'test' });

      expect(repo.findOneBy).toBeCalledTimes(2);
      expect(repo.update).toBeCalledWith({ id: employeeId }, { name: 'test' });
    });

    it('should throw EmployeeNotFoundException if requested employee is not found', () => {
      repo = createMock<Repository<Employee>>({ findOneBy: () => null });
      const employeeId = 1;

      try {
        service.updateBy(employeeId, { name: 'test' });
      } catch (e) {
        expect(e instanceof EmployeeNotFoundException).toBe(true);
      }
    });
  });

  describe('deleteBy(id)', () => {
    it('should delete employee by id', async () => {
      const employeeId = 1;

      await service.deleteBy(employeeId);

      expect(repo.findOneBy).toBeCalledTimes(1);
      expect(repo.delete).toBeCalledWith({ id: employeeId });
    });

    it('should throw EmployeeNotFoundException if requested employee is not found', () => {
      repo = createMock<Repository<Employee>>({ findOneBy: () => null });
      const employeeId = 1;

      try {
        service.deleteBy(employeeId);
      } catch (e) {
        expect(e instanceof EmployeeNotFoundException).toBe(true);
      }
    });
  });
});
