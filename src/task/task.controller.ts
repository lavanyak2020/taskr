import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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

  @Get(':id')
  getById(@Param('id') id: number): Promise<Task> {
    return this.service.getById(id);
  }

  @Put('/:id')
  updateBy(
    @Param('id') id: number,
    @Body() updateRequest: Partial<Task>,
  ): Promise<Task> {
    return this.service.updateBy(id, updateRequest);
  }

  @Delete('/:id')
  deleteBy(@Param('id') id: number): Promise<void> {
    return this.service.deleteBy(id);
  }
}
