import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './manager.module.css'

const API = "http://localhost:3000"
const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
})

const emptyForm = { title: "", year: "", rating: "", description: "", poster: "", genres: [] }

export default function Manager() {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [form, setForm] = useState(emptyForm)
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        fetchMovies()
        fetch(`${API}/genres`)
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setGenres(data) })
    }, [])

    const fetchMovies = () => {
        fetch(`${API}/movies`)
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setMovies(data) })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleGenreToggle = (genreName) => {
        setForm(prev => ({
            ...prev,
            genres: prev.genres.includes(genreName)
                ? prev.genres.filter(g => g !== genreName)
                : [...prev.genres, genreName]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        const body = {
            title: form.title,
            year: parseInt(form.year),
            rating: parseFloat(form.rating),
            description: form.description,
            poster: form.poster,
            genres: form.genres
        }

        try {
            const url = editingId ? `${API}/movies/${editingId}` : `${API}/movies`
            const method = editingId ? "PATCH" : "POST"
            const res = await fetch(url, {
                method,
                headers: authHeaders(),
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Something went wrong")
            setSuccess(editingId ? "Movie updated!" : "Movie added!")
            setForm(emptyForm)
            setEditingId(null)
            fetchMovies()
        } 
        catch (err) {
            setError(err.message)
        } 
        finally {
            setLoading(false)
        }
    }

    const handleEdit = (movie) => {
        setEditingId(movie.id)
        setForm({
            title: movie.title,
            year: movie.year,
            rating: movie.rating,
            description: movie.description,
            poster: movie.poster,
            genres: movie.genres?.map(g => g.name) || []
        })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this movie?")) return
        const res = await fetch(`${API}/movies/${id}`, {
            method: "DELETE",
            headers: authHeaders()
        })
        if (res.ok) {
            setMovies(movies.filter(m => m.id !== id))
            setSuccess("Movie deleted.")
        }
    }

    const handleCancel = () => {
        setForm(emptyForm)
        setEditingId(null)
        setError("")
        setSuccess("")
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/movies" className={styles.logoLink}>
                    <span>Movie Explorer <img src="/src/assets/icons/film-roll.png" /></span>
                </Link>
                <h2 className={styles.pageTitle}>Manage Movies</h2>
            </header>

            <main className={styles.main}>
                <div className={styles.formSection}>
                    <h3 className={styles.formTitle}>{editingId ? "Edit Movie" : "Add New Movie"}</h3>

                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.successMsg}>{success}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label className={styles.label}>Title</label>
                                <input name="title" value={form.title} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Year</label>
                                <input name="year" type="number" value={form.year} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Rating</label>
                                <input name="rating" type="number" step="0.1" min="0" max="10" value={form.rating} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Poster URL</label>
                                <input name="poster" value={form.poster} onChange={handleChange} className={styles.input} required />
                            </div>
                            <div className={`${styles.field} ${styles.fullWidth}`}>
                                <label className={styles.label}>Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} className={styles.textarea} rows={3} required />
                            </div>
                            <div className={`${styles.field} ${styles.fullWidth}`}>
                                <label className={styles.label}>Genres</label>
                                <div className={styles.genreGroup}>
                                    {genres.map(g => (
                                        <button
                                            key={g.id}
                                            type="button"
                                            className={`${styles.genreBtn} ${form.genres.includes(g.name) ? styles.genreActive : ""}`}
                                            onClick={() => handleGenreToggle(g.name)}
                                        >
                                            {g.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? "Saving..." : editingId ? "Update Movie" : "Add Movie"}
                            </button>
                            {editingId && (
                                <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className={styles.listSection}>
                    <h3 className={styles.formTitle}>All Movies ({movies.length})</h3>
                    <div className={styles.movieList}>
                        {movies.map(movie => (
                            <div key={movie.id} className={styles.movieRow}>
                                <img src={movie.poster} alt={movie.title} className={styles.thumb} />
                                <div className={styles.movieInfo}>
                                    <span className={styles.movieTitle}>{movie.title}</span>
                                    <span className={styles.movieMeta}>{movie.year} • {movie.rating}⭐ • {movie.genres?.map(g => g.name).join(", ")}</span>
                                </div>
                                <div className={styles.movieActions}>
                                    <button className={styles.editBtn} onClick={() => handleEdit(movie)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(movie.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}