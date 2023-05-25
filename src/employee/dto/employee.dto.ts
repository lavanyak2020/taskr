import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @IsNotEmpty()
  position: string;
}
