import { NavLink } from "react-router-dom"
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <header className={styles.header}>
            <span>Movie Explorer</span>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/favourites">⭐ Favourites</NavLink>
            </nav>
        </header>
    )
}