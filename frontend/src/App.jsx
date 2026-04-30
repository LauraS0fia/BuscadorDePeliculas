import { useEffect, useState } from 'react'
import './App.css'
import { getFirstMovies } from './utils/actions'

function App() {
  useEffect(() => {

    const fetchData = async () => {
      try {
        const movies = await getFirstMovies();
        console.log(movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Hola</h1>
    </>
  )
}

export default App
