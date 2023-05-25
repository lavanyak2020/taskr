import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: number) {
    super('Task with id:' + id + ' is not found', HttpStatus.NOT_FOUND);
  }
}
