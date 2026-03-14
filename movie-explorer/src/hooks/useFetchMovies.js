import { useState, useEffect } from "react"
import { movies } from "../data/movies"

export function useFetchMovies() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        const timeout = setTimeout(() => {
            try {
                setData(movies)  
                setLoading(false)
            } catch (err) {
                setError("Something went wrong, try again later.")
                setLoading(false)
            }
        }, 400) 

        return () => clearTimeout(timeout) 
    }, [])

    return { data, loading, error }
}