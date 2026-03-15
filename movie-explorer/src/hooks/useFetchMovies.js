import { useState, useEffect } from "react"

export function useFetchMovies(search = "", sort = "", genre = "") {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/movies?search=${search}&sort=${sort}&genre=${genre}`)
            .then(res => res.json())
            .then(data => { setData(data); setLoading(false) })
            .catch(() => { setError("Something went wrong"); setLoading(false) })
    }, [search, sort, genre])

    return { data, loading, error }
}