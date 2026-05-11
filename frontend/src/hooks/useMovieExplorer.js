import { useEffect, useState } from 'react'
import { getGenres, getMovies } from '../utils/actions'

const filterAndSortMovies = (movies, filters) => {
  const { genreId, year, sortBy } = filters

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = !genreId || movie.genre_ids?.includes(Number(genreId))
    const matchesYear = !year || movie.release_date?.startsWith(String(year))

    return matchesGenre && matchesYear
  })

  return [...filteredMovies].sort((leftMovie, rightMovie) => {
    if (sortBy === 'vote_average.desc') {
      return (rightMovie.vote_average || 0) - (leftMovie.vote_average || 0)
    }

    if (sortBy === 'release_date.desc') {
      return new Date(rightMovie.release_date || 0).getTime() - new Date(leftMovie.release_date || 0).getTime()
    }

    return (rightMovie.popularity || 0) - (leftMovie.popularity || 0)
  })
}

export const useMovieExplorer = () => {
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [genres, setGenres] = useState([])
  const [selectedGenreId, setSelectedGenreId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchInput.trim())
      setCurrentPage(1)
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [searchInput])

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await getGenres()
        setGenres(response.genres || [])
      } catch (genreError) {
        console.error(genreError)
        setGenres([])
      }
    }

    loadGenres()
  }, [])

  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await getMovies({
          query: searchQuery,
          page: currentPage,
          genreId: selectedGenreId,
          year: selectedYear,
          sortBy,
        })
        const { results, total_pages: responseTotalPages } = response
        const normalizedMovies = filterAndSortMovies(results || [], {
          genreId: selectedGenreId,
          year: selectedYear,
          sortBy,
        })

        setMovies(normalizedMovies)
        setTotalPages(responseTotalPages || 1)
      } catch (fetchError) {
        console.error(fetchError)
        setMovies([])
        setTotalPages(1)
        setError('No se pudieron cargar las películas. Inténtalo de nuevo.')
      } finally {
        setIsLoading(false)
      }
    }

    getMovie()
  }, [searchQuery, currentPage, selectedGenreId, selectedYear, sortBy])

  const handleGenreChange = (value) => {
    setSelectedGenreId(value)
    setCurrentPage(1)
  }

  const handleYearChange = (value) => {
    setSelectedYear(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSelectedGenreId('')
    setSelectedYear('')
    setSortBy('popularity.desc')
    setCurrentPage(1)
  }

  const hasResults = movies.length > 0
  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages
  const isFiltered = Boolean(selectedGenreId || selectedYear || sortBy !== 'popularity.desc')
  const emptyTitle = searchQuery || isFiltered ? 'No encontramos coincidencias' : 'Explora películas populares'
  const emptyDescription = searchQuery || isFiltered
    ? 'Prueba quitando filtros o cambiando la búsqueda para ampliar los resultados.'
    : 'Escribe un título o usa los filtros para descubrir películas.'

  return {
    movies,
    searchInput,
    setSearchInput,
    genres,
    selectedGenreId,
    selectedYear,
    sortBy,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasResults,
    canGoPrevious,
    canGoNext,
    isFiltered,
    emptyTitle,
    emptyDescription,
    handleGenreChange,
    handleYearChange,
    handleSortChange,
    handleClearFilters,
    setCurrentPage,
  }
}