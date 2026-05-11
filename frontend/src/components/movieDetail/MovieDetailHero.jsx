const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v='

const formatRuntime = (runtime) => {
  if (!runtime) {
    return 'Duración no disponible'
  }

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  return `${hours} h ${minutes} min`
}

export const MovieDetailHero = ({ movie }) => {
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ''
  const genres = movie.genres?.map((genre) => genre.name).join(' · ') || movie.genre_names || 'Sin género'
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/D'
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/D'
  const trailer = movie.videos?.results?.find((video) => video.site === 'YouTube' && video.type === 'Trailer')

  return (
    <div className="detail-layout">
      <aside className="detail-poster">
        {posterUrl ? <img className="detail-poster__image" src={posterUrl} alt={movie.title || 'Póster de película'} /> : <div className="detail-poster__placeholder">Sin imagen</div>}
      </aside>

      <div className="detail-body">
        <p className="detail-kicker">Detalle de película</p>
        <h2 id="movie-detail-title" className="detail-title">
          {movie.title || 'Película sin título'}
        </h2>

        {movie.tagline ? <p className="detail-tagline">{movie.tagline}</p> : null}

        <div className="detail-badges">
          <span>{releaseYear}</span>
          <span>{formatRuntime(movie.runtime)}</span>
          <span>⭐ {rating}</span>
        </div>

        <p className="detail-overview">{movie.overview || 'No hay sinopsis disponible para esta película.'}</p>

        <div className="detail-meta-grid">
          <div>
            <span className="detail-meta-label">Géneros</span>
            <p>{genres}</p>
          </div>
          <div>
            <span className="detail-meta-label">Estado</span>
            <p>{movie.status || 'No disponible'}</p>
          </div>
          <div>
            <span className="detail-meta-label">Popularidad</span>
            <p>{typeof movie.popularity === 'number' ? movie.popularity.toFixed(1) : 'N/D'}</p>
          </div>
          <div>
            <span className="detail-meta-label">Idioma original</span>
            <p>{movie.original_language || 'N/D'}</p>
          </div>
        </div>

        {trailer ? (
          <a className="detail-trailer" href={`${YOUTUBE_BASE_URL}${trailer.key}`} target="_blank" rel="noreferrer">
            Ver trailer
          </a>
        ) : null}

        {movie.homepage ? (
          <a className="detail-link" href={movie.homepage} target="_blank" rel="noreferrer">
            Sitio oficial
          </a>
        ) : null}
      </div>
    </div>
  )
}