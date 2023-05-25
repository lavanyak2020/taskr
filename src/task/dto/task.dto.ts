import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsNotEmpty()
  employeeId: number;
}

export default TaskDto;
