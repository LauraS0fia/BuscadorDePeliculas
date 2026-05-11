import axios from 'axios'

const getApiBaseUrl = () => {
  const { VITE_URL_API, VITE_API_KEY } = import.meta.env

  if (!VITE_URL_API || !VITE_API_KEY) {
    throw new Error('Faltan variables de entorno para la API de películas')
  }

  return {
    baseUrl: VITE_URL_API,
    apiKey: VITE_API_KEY,
  }
}

export const getMovies = async ({ query = '', page = 1, genreId = '', year = '', sortBy = 'popularity.desc' } = {}) => {
  try {
    const { baseUrl, apiKey } = getApiBaseUrl()
    const endpoint = query ? '/search/movie' : '/discover/movie'
    const params = new URLSearchParams({
      api_key: apiKey,
      language: 'es-ES',
      page: String(page),
      ...(query ? { query } : { sort_by: sortBy }),
      ...(query ? {} : genreId ? { with_genres: genreId } : {}),
      ...(query ? {} : year ? { primary_release_year: year } : {}),
    })

    const url = `${baseUrl}${endpoint}?${params.toString()}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getFirstMovies = async (query = '', page = 1) => {
  return getMovies({ query, page })
}

export const getGenres = async () => {
  try {
    const { baseUrl, apiKey } = getApiBaseUrl()
    const params = new URLSearchParams({
      api_key: apiKey,
      language: 'es-ES',
    })

    const url = `${baseUrl}/genre/movie/list?${params.toString()}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getMovieDetails = async (movieId) => {
  try {
    const { baseUrl, apiKey } = getApiBaseUrl()
    const params = new URLSearchParams({
      api_key: apiKey,
      language: 'es-ES',
      append_to_response: 'credits,videos',
    })

    const url = `${baseUrl}/movie/${movieId}?${params.toString()}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
