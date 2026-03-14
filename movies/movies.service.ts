@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  findAll(search?: string, sort?: string, genre?: string) {
    return this.prisma.movie.findMany({
      where: {
        title: search ? { contains: search, mode: 'insensitive' } : undefined,
        genres: genre ? { some: { name: genre } } : undefined
      },
      orderBy: sort ? { [sort]: 'asc' } : undefined,
      include: { genres: true }
    })
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({ 
      where: { id },
      include: { genres: true }
    })
  }

  create(dto: CreateMovieDto) {
    return this.prisma.movie.create({ data: dto })
  }

  update(id: number, dto: UpdateMovieDto) {
    return this.prisma.movie.update({ where: { id }, data: dto })
  }

  remove(id: number) {
    return this.prisma.movie.delete({ where: { id } })
  }
}