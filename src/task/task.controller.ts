import { Body, Controller, Post, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import Task from './task.entity';
import TaskDto from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  add(@Body() request: TaskDto): Promise<Task> {
    return this.service.add(request);
  }

  @Get()
  getAll(): Promise<Task[]> {
    return this.service.getAll();
  }
}
