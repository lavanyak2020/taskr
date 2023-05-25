import { HttpException, HttpStatus } from '@nestjs/common';

export class EmployeeNotFoundException extends HttpException {
  constructor(id: number) {
    super('Employee with id:' + id + ' is not found', HttpStatus.NOT_FOUND);
  }
}
