import { useEffect, useState } from 'react'

const FAVORITES_STORAGE_KEY = 'cinematic-favorites-v1'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const normalizeFavoriteMovie = (movie) => {
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : movie.posterUrl || ''

  return {
    id: movie.id,
    title: movie.title || movie.name || 'Película sin título',
    poster_path: movie.poster_path || '',
    original_language: movie.original_language || 'N/D',
    release_date: movie.release_date || '',
    overview: movie.overview || '',
    vote_average: movie.vote_average || 0,
    popularity: movie.popularity || 0,
    genre_ids: movie.genre_ids || [],
    posterUrl,
  }
}

export const useFavorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)

      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites)
        setFavoriteMovies(Array.isArray(parsedFavorites) ? parsedFavorites : [])
      }
    } catch (storageError) {
      console.error(storageError)
      setFavoriteMovies([])
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  const isFavorite = (movieId) => favoriteMovies.some((favoriteMovie) => favoriteMovie.id === movieId)

  const toggleFavorite = (movie) => {
    setFavoriteMovies((currentFavorites) => {
      const normalizedMovie = normalizeFavoriteMovie(movie)
      const exists = currentFavorites.some((favoriteMovie) => favoriteMovie.id === normalizedMovie.id)

      if (exists) {
        return currentFavorites.filter((favoriteMovie) => favoriteMovie.id !== normalizedMovie.id)
      }

      return [...currentFavorites, normalizedMovie]
    })
  }

  return {
    favoriteMovies,
    isFavorite,
    toggleFavorite,
  }
}