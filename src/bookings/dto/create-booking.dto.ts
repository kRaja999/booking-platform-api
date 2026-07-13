import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;

  @IsString()
  bookingDate!: string;

  @IsString()
  bookingTime!: string;

  @IsString()
  serviceId!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
