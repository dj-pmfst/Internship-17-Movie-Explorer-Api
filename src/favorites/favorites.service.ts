import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateFavouriteDto) {
        return this.prisma.favourite.create({
            data: { movieId: dto.movieId },
            include: { movie: true }  
        })
    }

    findAll() {
        return this.prisma.favourite.findMany({
            include: { movie: true }  
        })
    }

    remove(id: number) {
        return this.prisma.favourite.delete({
            where: { id }
        })
    }
}
