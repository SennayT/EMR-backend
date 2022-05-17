import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Vitals } from '../vitals/vitals.entity';
import { Diagnosis } from 'src/diagnosis/diagnosis.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emergencyContactName: string;

  @Column()
  emergencyContactPhone: string;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.registeredPatients)
  registeredBy: User;

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.patient)
  diagnosis: Diagnosis[];

  @OneToMany(() => Vitals, (vitals) => vitals.patient)
  vitals: Vitals[];
}