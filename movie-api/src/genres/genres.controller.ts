import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe
  } from '@nestjs/common';
  import { GenreService } from './genres.service';
  import { CreateGenreDto } from './dto/create-genre.dto';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('genre')
@Controller('genres')
export class GenresController {
    constructor(private genreService: GenreService) {}

    @Get()
    @ApiOkResponse({ description: 'Dohvaćeni svi žanrovi' })
    findAll() {
      return this.genreService.findAll()
    }

    @Post()
    @ApiCreatedResponse({ description: 'Kreiran novi žanr' })
    create(@Body() dto: CreateGenreDto) {
        return this.genreService.create(dto)
    }
}
