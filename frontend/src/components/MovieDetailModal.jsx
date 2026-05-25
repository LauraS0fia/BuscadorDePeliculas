import { MovieCastSection } from './movieDetail/MovieCastSection'
import { MovieDetailHero } from './movieDetail/MovieDetailHero'
import { MovieDetailLoading } from './movieDetail/MovieDetailLoading'

export const MovieDetailModal = ({ movie, isLoading, error, onClose }) => {
  if (!movie && !isLoading && !error) {
    return null
  }

  const activeMovie = movie || {}
  const cast = activeMovie.credits?.cast?.slice(0, 6) || []

  return (
    <div className="detail-overlay" role="presentation" onClick={onClose}>
      <div className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="movie-detail-title" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="detail-close" onClick={onClose} aria-label="Cerrar detalle">
          Cerrar
        </button>

        {error ? (
          <div className="detail-error">
            <h2>No se pudo cargar el detalle</h2>
            <p>{error}</p>
          </div>
        ) : null}

        {isLoading ? (
          <MovieDetailLoading />
        ) : (
          <>
            <MovieDetailHero movie={activeMovie} />
            <MovieCastSection cast={cast} />
          </>
        )}
      </div>
    </div>
  )
}