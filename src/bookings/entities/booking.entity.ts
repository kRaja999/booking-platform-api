import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ServiceEntity } from '../../services/entities/service.entity';
import { BookingStatus } from '../booking-status.enum';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerName!: string;

  @Column()
  customerEmail!: string;

  @Column()
  customerPhone!: string;

  @Column({ type: 'date' })
  bookingDate!: string;

  @Column({ type: 'time' })
  bookingTime!: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes!: string | null;

  @Column({ type: 'uuid' })
  serviceId!: string;

  @ManyToOne(
    () => ServiceEntity,
    (service: ServiceEntity) => service.bookings,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn({ name: 'serviceId' })
  service!: ServiceEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
