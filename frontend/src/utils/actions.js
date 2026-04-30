import axios from 'axios'

export const getFirstMovies = async (filtro = '') => {
    try {
        const { VITE_URL_API } = import.meta.env;
        const response = await axios.get(VITE_URL_API);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}