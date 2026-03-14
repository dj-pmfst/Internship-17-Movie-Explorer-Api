import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateGenreDto) {
        return this.prisma.genre.create({
            data: {name: dto.name},
        })
    }

    findAll() {
        return this.prisma.genre.findMany({
            include: { movies: true }  
        })
    }
}
