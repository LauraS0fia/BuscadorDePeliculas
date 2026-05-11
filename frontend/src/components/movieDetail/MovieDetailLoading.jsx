export const MovieDetailLoading = () => {
  return (
    <div className="detail-loading">
      <div className="detail-loading__poster" />
      <div className="detail-loading__content">
        <div className="detail-loading__line detail-loading__line--title" />
        <div className="detail-loading__line" />
        <div className="detail-loading__line" />
        <div className="detail-loading__line detail-loading__line--short" />
      </div>
    </div>
  )
}