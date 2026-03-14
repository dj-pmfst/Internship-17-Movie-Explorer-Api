import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  findAll(search?: string, sort?: string, genre?: string) {
    return this.prisma.movie.findMany({
      where: {
        title: search ? { contains: search, mode: 'insensitive' } : undefined,
        genres: genre ? { some: { name: genre } } : undefined,
      },
      orderBy: sort ? { [sort]: 'asc' } : undefined,
      include: { genres: true },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: { genres: true },
    });
  }

  create(dto: CreateMovieDto) {
    const { genres, ...rest } = dto;
    return this.prisma.movie.create({
      data: {
        ...rest,
        description: rest.description ?? '',   
        genres: genres
          ? { connect: genres.map((name) => ({ name })) }
          : undefined,
      },
      include: { genres: true },
    });
  }

  update(id: number, dto: UpdateMovieDto) {
    const { genres, ...rest } = dto;
    return this.prisma.movie.update({
      where: { id },
      data: {
        ...rest,
        genres: genres
          ? { set: genres.map((name) => ({ name })) }
          : undefined,
      },
      include: { genres: true },
    });
  }

  remove(id: number) {
    return this.prisma.movie.delete({ where: { id } });
  }
}