import { useRef } from 'react'
import { CardMovie } from '../../assets/CardMovie'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const MovieCarouselSection = ({
  title,
  description,
  movies,
  onMovieSelect,
  onFavoriteToggle,
  isFavorite,
}) => {
  const railRef = useRef(null)

  const handleScroll = (direction) => {
    if (!railRef.current) {
      return
    }

    const scrollAmount = Math.round(railRef.current.clientWidth * 0.8)
    railRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="carousel-section" aria-label={title}>
      <div className="carousel-section__header">
        <div>
          <p className="carousel-section__kicker">Colección</p>
          <h3 className="carousel-section__title">{title}</h3>
          {description ? <p className="carousel-section__description">{description}</p> : null}
        </div>

        <div className="carousel-section__controls">
          <button type="button" className="carousel-section__button" onClick={() => handleScroll(-1)} aria-label={`Ver películas anteriores de ${title}`}>
            Anterior
          </button>
          <button type="button" className="carousel-section__button" onClick={() => handleScroll(1)} aria-label={`Ver más películas de ${title}`}>
            Siguiente
          </button>
        </div>
      </div>

      <div className="carousel-rail" ref={railRef}>
        {movies.length > 0 ? (
          movies.map((movie) => {
            const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : movie.posterUrl || ''
            const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
            const movieId = movie.id

            return (
              <div className="carousel-rail__item" key={movieId}>
                <CardMovie
                  title={movie.title}
                  poster={posterUrl}
                  type={movie.original_language}
                  year={year}
                  description={movie.overview}
                  rating={movie.vote_average}
                  onClick={() => onMovieSelect(movie)}
                  onFavoriteToggle={onFavoriteToggle ? () => onFavoriteToggle(movie) : undefined}
                  isFavorite={isFavorite ? isFavorite(movieId) : false}
                  compact
                />
              </div>
            )
          })
        ) : (
          <div className="carousel-empty">
            <p>No hay películas disponibles para esta sección.</p>
          </div>
        )}
      </div>
    </section>
  )
}
