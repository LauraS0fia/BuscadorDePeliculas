import React from "react";
import './CardMovie.css';

export const CardMovie = ({ title, poster, type, year }) => {
    const altText = title || 'Movie poster';
    return (
        <div className="card-movie">
            <h2 className="card-movie-title">{title}</h2>
            {poster ? <img className="card-movie-poster" src={poster} alt={altText} /> : <img className="card-movie-poster" alt={altText} />}
            <div className="card-movie-info">
                <p className="card-movie-type">{type}</p>
                <p className="card-movie-year">{year}</p>
            </div>
        </div>
    );
};
