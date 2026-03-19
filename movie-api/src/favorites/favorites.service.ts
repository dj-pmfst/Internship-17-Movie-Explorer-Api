import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateFavouriteDto, userId: number) {
        return this.prisma.favourite.create({
            data: { 
                movieId: dto.movieId,
                userId 
            },
            include: { movie: true }  
        })
    }

    findAll(userId: number) {
        return this.prisma.favourite.findMany({
            where: {userId},
            include: { movie: true }  
        })
    }

    remove(id: number, userId: number) {
        return this.prisma.favourite.delete({
            where: { 
                id,
                userId 
            }
        })
    }
}
