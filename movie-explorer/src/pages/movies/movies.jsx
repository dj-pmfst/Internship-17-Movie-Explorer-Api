import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useFetchMovies } from "../../hooks/useFetchMovies"
import MovieCard from "../../components/MovieCard/MovieCard"
import styles from './movies.module.css'
import { useSearchParams } from "react-router-dom"
import Loading from "../../components/Loading/loader"

export default function Movies() {
    const [searchParams] = useSearchParams()          
    const [inputValue, setInputValue] = useState(searchParams.get("search") || "")
    const [search, setSearch] = useState(searchParams.get("search") || "")
    const [sortBy, setSortBy] = useState("title")
    const [genre, setGenre] = useState("All")
    const { data, loading, error } = useFetchMovies(search, sortBy, genre) 
    const searchRef = useRef(null)
    const debounceRef = useRef(null)
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/genres")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setGenres(data)
            })
    }, [])
    
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }, [loading])

    const handleSearch = (e) => {
        setInputValue(e.target.value)  
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            setSearch(e.target.value)  
        }, 300)
    }

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
                        value={inputValue}  
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
                {data.length === 0
                    ? <p>No movies found for this query.</p>
                    : <div className={styles.grid}>
                        {data.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                }                  
                </div>
            </main>
        </div>
    )
}