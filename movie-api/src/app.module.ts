import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MoviesModule, GenresModule, FavoritesModule, UserModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
