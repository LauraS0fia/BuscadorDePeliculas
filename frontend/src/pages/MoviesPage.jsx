import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardMovie } from '../assets/CardMovie'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { MovieDetailModal } from '../components/MovieDetailModal'
import { MovieFilters } from '../components/MovieFilters'
import { MovieCarouselSection } from '../components/movieHome/MovieCarouselSection'
import { useFavorites } from '../hooks/useFavorites'
import { useHomeSections } from '../hooks/useHomeSections'
import { useMovieExplorer } from '../hooks/useMovieExplorer'
import { useAuth } from '../context/AuthContext'
import { getMovieDetails } from '../utils/actions'
import './MoviesPage.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export function MoviesPage() {
  const navigate = useNavigate()
  const { handleLogout } = useAuth()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState('')
  
  const {
    movies,
    searchInput,
    setSearchInput,
    genres,
    selectedGenreId,
    selectedYear,
    sortBy,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasResults,
    canGoPrevious,
    canGoNext,
    isFiltered,
    emptyTitle,
    emptyDescription,
    handleGenreChange,
    handleYearChange,
    handleSortChange,
    handleClearFilters,
    setCurrentPage,
  } = useMovieExplorer()

  const { favoriteMovies, isFavorite, toggleFavorite } = useFavorites()
  const { popularMovies, genreSections, isLoading: isHomeLoading } = useHomeSections(genres)
  const activeFiltersCount = Number(Boolean(selectedGenreId)) + Number(Boolean(selectedYear)) + Number(sortBy !== 'popularity.desc')
  const heroResultsLabel = isLoading ? 'Cargando' : hasResults ? `${movies.length}` : '0'
  const showHomeSections = !searchInput.trim()
  const statusMessage = showHomeSections ? 'Explora por género y populares' : hasResults ? `${movies.length} resultados encontrados` : 'Sin resultados'

  const heroMovie = (popularMovies && popularMovies.length > 0 && popularMovies[0]) || (movies && movies.length > 0 && movies[0]) || null
  const heroYear = heroMovie?.release_date ? heroMovie.release_date.split('-')[0] : ''
  const heroRating = typeof heroMovie?.vote_average === 'number' ? heroMovie.vote_average.toFixed(1) : ''

  const handleMovieSelect = async (movie) => {
    setSelectedMovie(movie)
    setSelectedMovieDetails(null)
    setIsDetailLoading(true)
    setDetailError('')

    try {
      const response = await getMovieDetails(movie.id)
      setSelectedMovieDetails(response)
    } catch (movieDetailError) {
      console.error(movieDetailError)
      setDetailError('No se pudo cargar el detalle de la película.')
    } finally {
      setIsDetailLoading(false)
    }
  }

  const handleCloseDetail = () => {
    setSelectedMovie(null)
    setSelectedMovieDetails(null)
    setIsDetailLoading(false)
    setDetailError('')
  }

  const handleFavoriteSelect = async (movie) => {
    await handleMovieSelect(movie)
  }

  const handleLogoutClick = () => {
    handleLogout()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    const header = document.querySelector('.app-nav')
    if (!header) {
      return
    }

    const onScroll = () => {
      const scrolled = window.scrollY > 36
      header.classList.toggle('scrolled', scrolled)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-container">
      <header className="app-nav">
        <div className="app-nav__brand">
          <span className="app-logo">CINESTREAM</span>
          <span className="app-logo__dot" aria-hidden="true" />
          <span className="app-logo__tag">by TMDB</span>
        </div>

        <nav className="app-nav__links" aria-label="Secciones principales">
          <a href="#inicio" className="app-nav__link">Inicio</a>
          <a href="#catalogo" className="app-nav__link">Catálogo</a>
          <a href="#watchlist" className="app-nav__link">Watchlist</a>
        </nav>

        <div className="app-nav__actions">
          <button type="button" className="logout-button" onClick={handleLogoutClick}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {showHomeSections && heroMovie ? (
        <section
          className="hero-section fade-in"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.18), rgba(2,6,23,0.78)), url(${IMAGE_BASE_URL}${heroMovie.backdrop_path || heroMovie.poster_path})` }}
        >
          <div className="hero-sheen" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker">Destacado</p>
              <h2 className="hero-title">{heroMovie.title || heroMovie.name}</h2>
              <div className="hero-badges">
                {heroYear ? <span>{heroYear}</span> : null}
                {heroRating ? <span>⭐ {heroRating}</span> : null}
                <span>{heroMovie.original_language?.toUpperCase() || 'HD'}</span>
              </div>
              <p className="hero-overview">{heroMovie.overview}</p>
              <div className="hero-actions">
                <button type="button" className="hero-cta" onClick={() => handleMovieSelect(heroMovie)}>Ver Detalle</button>
                <button type="button" className="hero-cta ghost" onClick={() => toggleFavorite(heroMovie)}>
                  {isFavorite(heroMovie.id) ? 'En Mi Lista' : 'Mi Lista'}
                </button>
              </div>
            </div>
            <div className="hero-metrics" aria-label="Resumen rápido">
              <article className="metric-card metric-card--primary">
                <span className="metric-card__label">Resultados</span>
                <strong className="metric-card__value">{heroResultsLabel}</strong>
                <span className="metric-card__hint">películas visibles</span>
              </article>
              <article className="metric-card">
                <span className="metric-card__label">Favoritos</span>
                <strong className="metric-card__value">{favoriteMovies.length}</strong>
                <span className="metric-card__hint">guardados</span>
              </article>
              <article className="metric-card">
                <span className="metric-card__label">Filtros activos</span>
                <strong className="metric-card__value">{activeFiltersCount}</strong>
                <span className="metric-card__hint">aplicados</span>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      <section className="search-section" aria-label="Buscador principal">
        <div className="search-shell">
          <label className="search-label" htmlFor="movie-search">
            Buscar película
          </label>
          <input
            id="movie-search"
            type="text"
            className="search-input"
            placeholder="Busca una película, actor o director..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-describedby="search-help"
          />
          <p id="search-help" className="search-help">
            Escribe el nombre de una película para ver resultados.
          </p>
        </div>
      </section>

      <MovieFilters
        genres={genres}
        selectedGenreId={selectedGenreId}
        selectedYear={selectedYear}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onYearChange={handleYearChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      <div className="section-label-row" id="inicio" aria-hidden="true">
        <span className="section-label-row__line" />
        <span className="section-label-row__text">{showHomeSections ? 'Inicio' : 'Catálogo'}</span>
        <span className="section-label-row__line" />
      </div>

      <div className="results-status" id="catalogo" aria-live="polite" aria-busy={isLoading}>
        {isLoading && <span>Cargando películas...</span>}
        {!isLoading && error && <span className="results-error">{error}</span>}
        {!isLoading && !error && <span>{statusMessage}</span>}
      </div>

      {isLoading ? (
        <LoadingState />
      ) : error ? null : hasResults ? (
        <>
          <div className="movies-grid">
            {movies.map((movie) => {
              const { title, poster_path, original_language, release_date, id, overview, vote_average } = movie
              const posterUrl = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : ''
              const year = release_date ? release_date.split('-')[0] : 'N/A'

              return (
                <CardMovie
                  key={id}
                  title={title}
                  poster={posterUrl}
                  type={original_language}
                  year={year}
                  description={overview}
                  rating={vote_average}
                  onClick={() => handleMovieSelect(movie)}
                  onFavoriteToggle={() => toggleFavorite(movie)}
                  isFavorite={isFavorite(id)}
                />
              )
            })}
          </div>

          <div className="pagination" aria-label="Paginación de películas">
            <button
              type="button"
              className="pagination-button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={!canGoPrevious || isLoading}
            >
              Anterior
            </button>

            <span className="pagination-status">
              Página {currentPage} de {totalPages}
            </span>

            <button
              type="button"
              className="pagination-button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={!canGoNext || isLoading}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : showHomeSections ? (
        <>
          <div className="home-feature">
            <div className="home-feature__copy">
              <p className="home-feature__kicker">Inicio</p>
              <h2 className="home-feature__title">Lo más visto y los mejores géneros, en carruseles</h2>
              <p className="home-feature__description">
                Explora directamente desde la portada. Cada bloque reúne películas por género y una fila de populares para descubrir rápido sin buscar.
              </p>
            </div>
          </div>

          <MovieCarouselSection
            title="Más vistas"
            description="Las películas con mayor popularidad ahora mismo."
            movies={popularMovies}
            onMovieSelect={handleMovieSelect}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite}
          />

          {isHomeLoading ? (
            <LoadingState label="Cargando secciones de inicio..." />
          ) : (
            genreSections.map((section) => (
              <MovieCarouselSection
                key={section.id}
                title={section.title}
                description={`Películas destacadas del género ${section.title}.`}
                movies={section.movies}
                onMovieSelect={handleMovieSelect}
                onFavoriteToggle={toggleFavorite}
                isFavorite={isFavorite}
              />
            ))
          )}
        </>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} actionLabel={isFiltered ? 'Limpiar filtros' : ''} onAction={isFiltered ? handleClearFilters : undefined} />
      )}

      <div className="section-label-row section-label-row--favorites" id="watchlist" aria-hidden="true">
        <span className="section-label-row__line" />
        <span className="section-label-row__text">Watchlist</span>
        <span className="section-label-row__line" />
      </div>

      <section className="favorites-panel" aria-label="Películas guardadas">
        <div className="favorites-panel__header">
          <div>
            <p className="favorites-panel__kicker">Watchlist</p>
            <h2 className="favorites-panel__title">Películas guardadas</h2>
          </div>
          <span className="favorites-panel__count">{favoriteMovies.length} guardadas</span>
        </div>

        {favoriteMovies.length > 0 ? (
          <div className="favorites-grid">
            {favoriteMovies.map((movie) => {
              const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'

              return (
                <CardMovie
                  key={movie.id}
                  title={movie.title}
                  poster={movie.posterUrl}
                  type={movie.original_language}
                  year={year}
                  description={movie.overview}
                  rating={movie.vote_average}
                  onClick={() => handleFavoriteSelect(movie)}
                  onFavoriteToggle={() => toggleFavorite(movie)}
                  isFavorite
                  compact
                />
              )
            })}
          </div>
        ) : (
          <p className="favorites-panel__empty">Aún no guardaste ninguna película.</p>
        )}
      </section>

      <ErrorState message={detailError} isVisible={Boolean(detailError) && !isDetailLoading} />

      <MovieDetailModal
        movie={selectedMovieDetails || selectedMovie}
        isLoading={isDetailLoading}
        error={detailError}
        onClose={handleCloseDetail}
      />
    </div>
  )
}
