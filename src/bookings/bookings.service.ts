import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const service = await this.serviceRepository.findOne({
      where: {
        id: createBookingDto.serviceId,
        isActive: true,
      },
    });

    if (!service) {
      throw new BadRequestException(
        'Selected service does not exist or is inactive',
      );
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        serviceId: createBookingDto.serviceId,
        bookingDate: createBookingDto.bookingDate,
        bookingTime: createBookingDto.bookingTime,
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        'This service is already booked for the selected date and time',
      );
    }

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      notes: createBookingDto.notes ?? null,
    });

    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: {
        service: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async updateStatus(
    id: string,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    booking.status = updateBookingStatusDto.status;

    return this.bookingRepository.save(booking);
  }

  async remove(id: string): Promise<{ message: string }> {
    const booking = await this.findOne(id);

    await this.bookingRepository.remove(booking);

    return {
      message: 'Booking deleted successfully',
    };
  }
}
