import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

enum TaskStatus {
  PENDING = 'pendiente',
  IN_PROGRESS = 'en progreso',
  COMPLETED = 'finalizada',
}

export class taskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  readonly projectId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly responsableUser: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly creatorUser: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  @IsOptional()
  readonly deleted: boolean;

  @ApiProperty({ type: 'timestamptz' })
  @IsDateString()
  @IsOptional()
  readonly startDate: Date;

  @ApiProperty({ type: 'timestamptz' })
  @IsDateString()
  @IsOptional()
  readonly endDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly status: TaskStatus;
}
