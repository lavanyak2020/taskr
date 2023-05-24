import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../../../src/employee/employee.service';
import { EmployeeDto } from '../../../src/employee/dto/employee-dto';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
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

      expect(response).toBe(employee);
    });
  });
});
