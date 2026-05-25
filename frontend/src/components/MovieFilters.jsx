export const MovieFilters = ({
  genres,
  selectedGenreId,
  selectedYear,
  sortBy,
  onGenreChange,
  onYearChange,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <section className="filters-panel" aria-label="Filtros de películas">
      <div className="filters-grid">
        <label className="filter-field" htmlFor="genre-filter">
          <span className="filter-label">Género</span>
          <select id="genre-filter" className="filter-control" value={selectedGenreId} onChange={(event) => onGenreChange(event.target.value)}>
            <option value="">Todos los géneros</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field" htmlFor="year-filter">
          <span className="filter-label">Año</span>
          <input
            id="year-filter"
            className="filter-control"
            type="number"
            min="1900"
            max="2100"
            placeholder="Ej: 2024"
            value={selectedYear}
            onChange={(event) => onYearChange(event.target.value)}
          />
        </label>

        <label className="filter-field" htmlFor="sort-filter">
          <span className="filter-label">Orden</span>
          <select id="sort-filter" className="filter-control" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            <option value="popularity.desc">Más populares</option>
            <option value="vote_average.desc">Mejor valoradas</option>
            <option value="release_date.desc">Más recientes</option>
          </select>
        </label>

        <div className="filter-actions">
          <button type="button" className="filter-reset" onClick={onClearFilters}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </section>
  )
}