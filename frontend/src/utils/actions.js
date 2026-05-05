import axios from 'axios';

export const getFirstMovies = async (query = '') => {
  try {
    const { VITE_URL_API, VITE_API_KEY } = import.meta.env;
    const endpoint = query ? '/search/movie' : '/discover/movie';
    const params = new URLSearchParams({
      api_key: VITE_API_KEY,
      language: 'es-ES',
      page: '1',
      ...(query ? { query } : { sort_by: 'popularity.desc' }),
    });

    const url = `${VITE_URL_API}${endpoint}?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
