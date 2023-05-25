import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import Employee from './employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Post()
  add(@Body() request: EmployeeDto): Promise<Employee> {
    return this.service.add(request);
  }

  @Get()
  getAll(): Promise<Employee[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  getBy(@Param('id') id: number): Promise<Employee> {
    return this.service.getBy(id);
  }

  @Put('/:id')
  updateBy(
    @Param('id') id: number,
    @Body() updateRequest: Partial<EmployeeDto>,
  ): Promise<Employee> {
    return this.service.updateBy(id, updateRequest);
  }

  @Delete('/:id')
  deleteBy(@Param('id') id: number): Promise<void> {
    return this.service.deleteBy(id);
  }
}
