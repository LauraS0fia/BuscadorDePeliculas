import { useEffect, useState } from 'react'
import { getMovies } from '../utils/actions'

const MOVIES_PER_SECTION = 8

export const useHomeSections = (genres) => {
  const [popularMovies, setPopularMovies] = useState([])
  const [genreSections, setGenreSections] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!genres.length) {
      setPopularMovies([])
      setGenreSections([])
      return
    }

    let isMounted = true

    const loadSections = async () => {
      setIsLoading(true)

      try {
        const popularPromise = getMovies({ page: 1, sortBy: 'popularity.desc' })
        const genrePromises = genres.map(async (genre) => {
          try {
            const response = await getMovies({ page: 1, genreId: genre.id, sortBy: 'popularity.desc' })
            return {
              id: genre.id,
              title: genre.name,
              movies: (response.results || []).slice(0, MOVIES_PER_SECTION),
            }
          } catch (error) {
            console.error(error)
            return {
              id: genre.id,
              title: genre.name,
              movies: [],
            }
          }
        })

        const [popularResponse, genreResponses] = await Promise.all([
          popularPromise,
          Promise.all(genrePromises),
        ])

        if (!isMounted) {
          return
        }

        setPopularMovies((popularResponse.results || []).slice(0, MOVIES_PER_SECTION))
        setGenreSections(genreResponses)
      } catch (error) {
        console.error(error)
        if (isMounted) {
          setPopularMovies([])
          setGenreSections([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSections()

    return () => {
      isMounted = false
    }
  }, [genres])

  return {
    popularMovies,
    genreSections,
    isLoading,
  }
}
