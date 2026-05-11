export const ErrorState = ({ message, isVisible = true }) => {
  if (!isVisible || !message) {
    return null
  }

  return (
    <section className="state-panel state-panel--error" role="alert">
      <h2 className="state-panel__title">Algo salió mal</h2>
      <p className="state-panel__description">{message}</p>
    </section>
  )
}