import React, { useEffect, useState } from "react";
import { getFirstMovies } from "../utils/actions";
import { CardMovie } from "./CardMovie";
import './Movies.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = async () => {
        try {
            const response = await getFirstMovies();
            const { results } = response;
            setMovies(results || []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="movies-container">
            {movies.map((movie) => {
                const { title, poster_path, original_language, release_date, id } = movie;
                const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : ''
                const year = release_date ? release_date.split('-')[0] : 'N/A'
                return (
                    <CardMovie
                        key={id}
                        title={title}
                        poster={posterUrl}
                        type={original_language}
                        year={year}
                    />
                );
            })}
        </div>
    );
};
