import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query
  } from '@nestjs/common';
  import { MoviesService } from './movies.service';
  import { CreateMovieDto } from './dto/create-movie.dto';
  import { UpdateMovieDto } from './dto/update-movie.dto';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse({ description: 'Dohvaćeni svi filmovi' })
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('genre') genre?: string
  ) {
    return this.moviesService.findAll(search, sort, genre)
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Dohvaćen jedan film' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id)
  }

  @Post()
  @ApiCreatedResponse({ description: 'Kreiran novi film' })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Ažuriran film' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Obrisan film' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id)
  }
}