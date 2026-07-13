import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Booking } from '../../bookings/entities/booking.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int' })
  duration!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
