export const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <section className="state-panel state-panel--empty" role="status">
      <h2 className="state-panel__title">{title}</h2>
      <p className="state-panel__description">{description}</p>

      {actionLabel && onAction ? (
        <button type="button" className="state-panel__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}