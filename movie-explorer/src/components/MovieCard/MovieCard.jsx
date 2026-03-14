import { useNavigate } from "react-router-dom"
import styles from './MovieCard.module.css'

export default function MovieCard({ movie, isFavourite, onRemove }) {
    const navigate = useNavigate()

    return (
        <div 
            className={`${styles.card} ${isFavourite ? styles.favourite : ""}`}
            onClick={() => navigate(`/movies/${movie.id}`)}
        >
            <img src={movie.poster} alt={movie.title} className={styles.poster} />
            <div className={styles.info}>
                <h3>{movie.title}</h3>
                <p>{movie.year}  &#x2022;  {movie.rating} ⭐</p>
                {onRemove && (
                    <button 
                        className={styles.removeButton}
                        onClick={(e) => {
                            e.stopPropagation()
                            onRemove(movie.id)
                        }}>
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
}