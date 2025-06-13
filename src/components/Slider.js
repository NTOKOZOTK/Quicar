"use client"

function Slider({ min = 0, max = 100, step = 1, value, onChange, className = "" }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number.parseInt(e.target.value))}
      className={`slider ${className}`}
    />
  )
}

export default Slider
