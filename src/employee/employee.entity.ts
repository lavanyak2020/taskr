import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Employee {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar' })
  public phone: string;

  @Column({ type: 'date' })
  public hireDate: Date;

  @Column({ type: 'varchar' })
  public position: string;
}

export default Employee;
