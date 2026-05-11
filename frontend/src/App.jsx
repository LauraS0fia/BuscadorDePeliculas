import { useEffect, useState } from 'react'
import { getFirstMovies } from './utils/actions'
import { CardMovie } from './assets/CardMovie'
import './App.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function App() {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getMovie(searchQuery)
  }, [searchQuery])

  const getMovie = async (query) => {
    try {
      const response = await getFirstMovies(query)
      const { results } = response
      setMovies(results || [])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Cinematic</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Busca una película..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="movies-grid">
        {movies.map((movie) => {
          const { title, poster_path, original_language, release_date, id, overview, vote_average } = movie
          const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : ''
          const year = release_date ? release_date.split('-')[0] : 'N/A'

          return (
            <CardMovie
              key={id}
              title={title}
              poster={posterUrl}
              type={original_language}
              year={year}
              description={overview}
              rating={vote_average}
            />
          )
        })}
      </div>
    </div>
  )
};

export default App
