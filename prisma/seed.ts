import { PrismaClient } from '../src/generated/prisma/client'
import { movies } from './movies' 
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {

  const genres = await prisma.genre.createMany({
    data: [
      { name: 'Action' },
      { name: 'Drama' },
      { name: 'Sci-fi' },
      { name: 'Fantasy' }
    ],
    skipDuplicates: true
  })

  const genreRecords = await prisma.genre.findMany()

  const genreMap = Object.fromEntries(
    genreRecords.map(g => [g.name.toLowerCase(), g.id])
  )

  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        title: movie.title,
        year: movie.year,
        rating: movie.rating ?? null,
        description: movie.description ?? '',
        poster: movie.poster,

        genres: {
          connect: [
            { id: genreMap[movie.genre.toLowerCase()] }
          ]
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })