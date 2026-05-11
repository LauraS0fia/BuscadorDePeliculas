export const MovieCastSection = ({ cast }) => {
  if (!cast.length) {
    return null
  }

  return (
    <section className="detail-section">
      <h3 className="detail-section__title">Reparto principal</h3>
      <div className="detail-cast-grid">
        {cast.map((person) => (
          <article key={person.cast_id || person.id} className="detail-cast-card">
            <div className="detail-cast-avatar">
              {person.profile_path ? (
                <img className="detail-cast-avatar__image" src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt={person.name} />
              ) : (
                <span>{person.name?.charAt(0) || '?'}</span>
              )}
            </div>
            <h4 className="detail-cast-name">{person.name}</h4>
            <p className="detail-cast-character">{person.character || 'Sin personaje'}</p>
          </article>
        ))}
      </div>
    </section>
  )
}