import React from "react";
import './CardMovie.css';

export const CardMovie = ({ title, poster, type, year, description, rating }) => {
    const altText = title || 'Movie poster';
    return (
        <div className="card-movie">
            <div className="card-movie-poster-container">
                {poster ? <img className="card-movie-poster" src={poster} alt={altText} /> : <div className="card-movie-poster-placeholder">Sin imagen</div>}
            </div>
            <div className="card-movie-content">
                <h2 className="card-movie-title">{title}</h2>
                <div className="card-movie-meta">
                    <span className="card-movie-year">{year}</span>
                    <span className="card-movie-type">{type}</span>
                    {rating && <span className="card-movie-rating">⭐ {rating.toFixed(1)}</span>}
                </div>
                {description && <p className="card-movie-description">{description}</p>}
            </div>
        </div>
    );
};
