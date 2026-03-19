import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Query,
    UseGuards
  } from '@nestjs/common';
  import { MoviesService } from './movies.service';
  import { CreateMovieDto } from './dto/create-movie.dto';
  import { UpdateMovieDto } from './dto/update-movie.dto';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/user/admin-auth.guard';

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

  @UseGuards(AdminAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'Kreiran novi film' })
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto)
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: 'Ažuriran film' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto)
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Obrisan film' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id)
  }
}