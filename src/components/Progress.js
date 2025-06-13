function Progress({ value, className = "" }) {
  return (
    <div className={`progress-bar ${className}`}>
      <div className="progress-fill" style={{ width: `${value}%` }}></div>
    </div>
  )
}

export default Progress
