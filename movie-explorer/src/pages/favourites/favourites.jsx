import styles from './favourites.module.css'
import MovieCard from "../../components/MovieCard/MovieCard"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/Loading/loader"
import { useState, useEffect } from "react"

export default function Favourites() {
    const [favourites, setFavourites] = useState([ ])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3000/favorites")
            .then(res => res.json())
            .then(data => setFavourites(data))
    }, [])

    useEffect(() => {                          
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 400)
        return () => clearTimeout(timeout)
    }, [])

    const removeFavourite = async (id) => {
        await fetch(`http://localhost:3000/favorites/${id}`, { method: "DELETE" })
        setFavourites(favourites.filter(f=>f.id !== id))
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
                        {favourites.map(fav => (
                                <MovieCard key={fav.id} movie={fav.movie} onRemove={() => removeFavourite(fav.id)} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        )
}