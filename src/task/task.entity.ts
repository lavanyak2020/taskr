import Employee from '../employee/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'varchar' })
  public description: string;

  @Column({ type: 'date' })
  public dueDate: Date;

  @ManyToOne(() => Employee, (employee) => employee.tasks)
  @JoinColumn({ name: 'employeeId' })
  public employee: Employee;
}

export default Task;
