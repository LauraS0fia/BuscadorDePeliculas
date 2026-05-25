import './CardMovie.css'

export const CardMovie = ({
    title,
    poster,
    type,
    year,
    description,
    rating,
    onClick,
    onFavoriteToggle,
    isFavorite = false,
    compact = false,
}) => {
    const altText = title || 'Póster de película'
    const ratingLabel = typeof rating === 'number' ? rating.toFixed(1) : ''

    return (
        <div
            className={`card-movie ${compact ? 'card-movie--compact' : ''}`}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick?.()
                }
            }}
            aria-label={`Abrir detalle de ${title}`}
        >
            {onFavoriteToggle ? (
                <button
                    type="button"
                    className={`card-movie-favorite ${compact ? 'card-movie-favorite--compact' : ''} ${isFavorite ? 'card-movie-favorite--active' : ''}`}
                    onClick={(event) => {
                        event.stopPropagation()
                        onFavoriteToggle()
                    }}
                    aria-label={isFavorite ? `Quitar ${title} de favoritos` : `Guardar ${title} en favoritos`}
                >
                    {isFavorite ? 'Guardada' : 'Guardar'}
                </button>
            ) : null}
            <div className="card-movie-poster-container">
                {poster ? <img className="card-movie-poster" src={poster} alt={altText} /> : <div className="card-movie-poster-placeholder">Sin imagen</div>}
                <div className="card-movie-overlay" aria-hidden="true" />
            </div>
            <div className="card-movie-content">
                <h2 className="card-movie-title">{title}</h2>
                <div className="card-movie-subtle">{type} · {year}</div>
                <div className="card-movie-meta">
                    <span className="card-movie-year">{year}</span>
                    <span className="card-movie-type">{type}</span>
                    {ratingLabel ? <span className="card-movie-rating">⭐ {ratingLabel}</span> : null}
                </div>
                {description ? <p className="card-movie-description">{description}</p> : null}
            </div>
        </div>
    )
}

export default CardMovie
