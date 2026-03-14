import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenreService } from './genres.service';
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [GenresController],
  providers: [GenreService]
})
export class GenresModule {}
