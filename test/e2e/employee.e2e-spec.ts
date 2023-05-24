import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './common';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createApp();
    await app.init();
  });

  describe('POST /employees', () => {
    it('should return 201 created', () => {
      const employee = {
        name: 'test',
        email: 'test@test.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: '2023/02/20',
      };

      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(201)
        .expect(employee);
    });

    it('should return 400 BadRequest if name is empty in the payload', () => {
      const employee = {
        name: '',
        email: 'test@test.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: '2023/02/20',
      };

      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(400);
    });

    it('should return 400 BadRequest if email is invalid', () => {
      const employee = {
        name: 'test',
        email: 'testtest.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: '2023/02/20',
      };

      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(400);
    });

    it('should return 400 BadRequest if phone is empty in the payload', () => {
      const employee = {
        name: 'test',
        email: 'test@test.com',
        phone: '',
        position: 'SDE1',
        hireDate: '2023/02/20',
      };

      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(400);
    });

    it('should return 400 BadRequest if position is empty in the payload', () => {
      const employee = {
        name: 'test',
        email: 'test@test.com',
        phone: '123456',
        position: '',
        hireDate: '2023/02/20',
      };

      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(400);
    });

    it('should return 400 BadRequest if hireDate is invalid', () => {
      const employee = {
        name: 'test',
        email: 'test@test.com',
        phone: '123456',
        position: 'SDE1',
        hireDate: '2023/22/20',
      };
      return request(app.getHttpServer())
        .post('/employees')
        .send({
          ...employee,
        })
        .expect(400);
    });
  });
});
