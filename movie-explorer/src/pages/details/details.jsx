import styles from './details.module.css'
import { useParams, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { movies } from "../../data/movies"
import { useDominantColor } from "../../hooks/useDominantColor"
import { Link } from "react-router-dom"

export default function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [favourites, setFavourites] = useLocalStorage("favourites", [])
    const movie = movies.find(m => m.id === parseInt(id))
    const isFavourite = favourites.some(f => f.id === movie?.id)
    const dominantColor = useDominantColor(movie?.poster)

    const toggleFavourite = () => {
        if (isFavourite) {
            setFavourites(favourites.filter(f => f.id !== movie.id))
        } else {
            setFavourites([...favourites, movie])
        }
    }

    if (!movie) return <p>Movie not found.</p>

    return (
        <div 
        className={styles.container}
        style={{ 
            background: dominantColor 
                ? `linear-gradient(to bottom, ${dominantColor}, rgb(94, 94, 94))` 
                : "rgb(94, 94, 94)" 
        }}
    >
            <header className={styles.header}>
                <Link to="/" className={styles.logoLink}>
                    <span>Movie Explorer <img src="/src/assets/icons/film-roll.png"/></span>
                </Link>
            </header>
            <main className={styles.main}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
                <div className={styles.content }>
                    <img src={movie.poster} alt={movie.title} className={styles.poster} />
                    <div className={styles.info}>
                        <h1>{movie.title}</h1>
                        <p className={styles.meta}>{movie.year} • {movie.genre} • {movie.rating} ⭐</p>
                        <p className={styles.description}>{movie.description}</p>
                        <button className={styles.favButton} onClick={toggleFavourite}>
                            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}