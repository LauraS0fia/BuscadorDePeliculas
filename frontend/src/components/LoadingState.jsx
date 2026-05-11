export const LoadingState = ({ label = 'Cargando películas...', count = 6 }) => {
  return (
    <section className="state-panel state-panel--loading" aria-busy="true" aria-live="polite">
      <div className="state-panel__header">
        <h2 className="state-panel__title">{label}</h2>
        <p className="state-panel__description">Estamos preparando el catálogo.</p>
      </div>

      <div className="movies-grid movies-grid--loading" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <div className="movie-skeleton" key={index} />
        ))}
      </div>
    </section>
  )
}