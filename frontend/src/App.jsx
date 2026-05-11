import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import { CardMovie } from './assets/CardMovie'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import { LoadingState } from './components/LoadingState'
import { MovieDetailModal } from './components/MovieDetailModal'
import { MovieFilters } from './components/MovieFilters'
import { MovieCarouselSection } from './components/movieHome/MovieCarouselSection'
import { useFavorites } from './hooks/useFavorites'
import { useHomeSections } from './hooks/useHomeSections'
import { useMovieExplorer } from './hooks/useMovieExplorer'
import { getMovieDetails } from './utils/actions'
import './App.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieExplorer({onLogout}) {
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

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header__copy">
          <p className="app-kicker">Buscador de películas</p>
          <h1 className="app-title">Cinematic</h1>
          <p className="app-subtitle">Busca títulos por nombre y explora resultados al instante.</p>
        </div>

        <button type="button" className="logout-button" onClick={onLogout}>
        Cerrar sesión
        </button>

        <div className="app-metrics" aria-label="Resumen rápido">
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
      </header>

      <div className="search-section">
        <label className="search-label" htmlFor="movie-search">
          Buscar película
        </label>
        <input
          id="movie-search"
          type="text"
          className="search-input"
          placeholder="Busca una película..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-describedby="search-help"
        />
        <p id="search-help" className="search-help">
          Escribe el nombre de una película para ver resultados.
        </p>
      </div>

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

      <div className="section-label-row" aria-hidden="true">
        <span className="section-label-row__line" />
        <span className="section-label-row__text">{showHomeSections ? 'Inicio' : 'Catálogo'}</span>
        <span className="section-label-row__line" />
      </div>

      <div className="results-status" aria-live="polite" aria-busy={isLoading}>
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

      <div className="section-label-row section-label-row--favorites" aria-hidden="true">
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

function App() {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    return localStorage.getItem('estaLogueado') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('estaLogueado', String(estaLogueado))
  }, [estaLogueado])

  const handleLogin = () => {
    setEstaLogueado(true)
  }

  const handleLogout = () => {
    setEstaLogueado(false)
    localStorage.removeItem('estaLogueado')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/movies"
        element={estaLogueado ? <MovieExplorer onLogout={handleLogout}/> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={estaLogueado ? <Navigate to="/movies" replace /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}

export default App