import { useEffect, useState } from 'react'
import { getFirstMovies } from './utils/actions'
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme/theme'
import { Title } from './assets/styled-component/Title'
import { CardMovie } from './assets/styled-component/CardMovie'

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovie()
  }, [])
  const getMovie = async () => {
    try {
      const response = await getFirstMovies()
      const { Search } = response
      setMovies(Search)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <Title>Hola</Title>
      {
        movies.map((movie) => {
          const { Title, Poster, Type, Year, imdbID } = movie

          return (
            <CardMovie
              key={imdbID}
              title={Title}
              poster={Poster}
              type={Type}
              year={Year}
            />
          )
        })
      }
    </ThemeProvider>
  )
};

export default App
