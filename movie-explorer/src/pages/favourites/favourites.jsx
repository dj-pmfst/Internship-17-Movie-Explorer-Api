import styles from './favourites.module.css'
import { useLocalStorage } from "../../hooks/useLocalStorage"
import MovieCard from "../../components/MovieCard/MovieCard"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/loader"
import { useState, useEffect } from "react"

export default function Favourites() {
    const [favourites, setFavourites] = useLocalStorage("favourites", [])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {                          
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 400)
        return () => clearTimeout(timeout)
    }, [])

    const removeFavourite = (id) => {
        setFavourites(favourites.filter(movie => movie.id !== id))
    }

    if (loading) return <Loading />

    if (favourites.length === 0) 
        return <p>No favourites added</p>

        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <span>Favourites <img className={styles.star} src="/src/assets/icons/star.png" /></span>
                    <button className={styles.backButton} onClick={() => navigate(-1)}><img src='/src/assets/icons/left-arrow.svg'/></button>
                </header>
                <main className={styles.main}>
                    <div className={styles.favourites}>
                        <div className={styles.grid}>
                            {favourites.map(movie => (
                                <MovieCard key={movie.id} movie={movie} onRemove={removeFavourite} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        )
}