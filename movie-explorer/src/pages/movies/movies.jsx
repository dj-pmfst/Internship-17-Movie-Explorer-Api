import { Link, useNavigate } from "react-router-dom"
import { useState, useMemo, useRef, useEffect } from "react"
import { useFetchMovies } from "../../hooks/useFetchMovies"
import MovieCard from "../../components/MovieCard/MovieCard"
import styles from './movies.module.css'
import { useSearchParams } from "react-router-dom"
import Loading from "../../components/Loading/loader"

export default function Movies() {
    const navigate = useNavigate()
    const { data, loading, error } = useFetchMovies()
    const [searchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [sortBy, setSortBy] = useState("title")
    const [genre, setGenre] = useState("All")
    const searchRef = useRef(null)
    const debounceRef = useRef(null)

    useEffect(() => {
        fetch("http://localhost:3000/genres")
            .then(res => res.json())
            .then(data => setGenre(data))
    }, [])
    
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }, [loading])

    const handleSearch = (e) => {
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setSearch(e.target.value)
        }, 300)
    }

    const filteredMovies = useMemo(() => {
        let result = [...data]

        if (search) {
            result = result.filter(movie =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (genre !== "All") {
            result = result.filter(movie => movie.genre === genre)
        }

        result.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title)
            if (sortBy === "year") return b.year - a.year
            if (sortBy === "rating") return b.rating - a.rating
            return 0
        })

        return result
    }, [data, search, genre, sortBy])

    if (loading) return <Loading />
    if (error) return <p>{error}</p>

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.logoLink}>
                    <span>Movie Explorer <img src="/src/assets/icons/film-roll.png"/></span>
                </Link>
                <Link to="/favourites" className={styles.favLink}>
                    <img className={styles.star} src="/src/assets/icons/star.png" /> 
                    Favourites
                </Link>
            </header>

            <main className={styles.main}>
                <div className={styles.searches}>
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search for a movie..."
                        className={styles.searchBar}
                        onChange={handleSearch}
                    />

                    <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                        <option value="title">Sort by Title</option>
                        <option value="year">Sort by Year</option>
                        <option value="rating">Sort by Rating</option>
                    </select>

                    <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                        <option value="">All Genres</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                    </select>                  
                </div>
                
                <div className={styles.movies}>
                    {filteredMovies.length === 0
                        ? <p>No movies found for this query.</p>
                        : <div className={styles.grid}>
                            {filteredMovies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    }                    
                </div>
            </main>
        </div>
    )
}