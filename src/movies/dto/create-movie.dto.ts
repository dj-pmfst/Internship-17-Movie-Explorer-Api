import { IsString, IsNumber, IsOptional, MinLength, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @Min(1800)
  year: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  poster: string;

  @ApiProperty({
    description: 'List of genre names',
  })
  @IsString({ each: true })
  genres: string[];
}