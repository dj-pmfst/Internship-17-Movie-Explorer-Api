import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe
  } from '@nestjs/common';
  import { FavoriteService } from './favorites.service';
  import { CreateFavouriteDto } from './dto/create-favourite.dto';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @ApiOkResponse({ description: 'Dohvaćeni svi favoriti' })
  findAll() {
    return this.favoriteService.findAll()
  }

  @Post()
  @ApiCreatedResponse({ description: 'Kreiran novi favorit' })
  create(@Body() dto: CreateFavouriteDto) {
    return this.favoriteService.create(dto)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Obrisan favorit' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.favoriteService.remove(id)
  }
}