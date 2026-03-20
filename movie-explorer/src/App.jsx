import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import Home from "./pages/home/home"
import Movies from "./pages/movies/movies"
import MovieDetail from "./pages/details/details"
import Favourites from "./pages/favourites/favourites"
import NotFound from "./pages/error/error"
import Auth from "./pages/auth/auth"

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App