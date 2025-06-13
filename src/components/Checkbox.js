"use client"

function Checkbox({ id, checked, onCheckedChange, className = "", children, ...props }) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className={`checkbox ${className}`}
        {...props}
      />
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  )
}

export default Checkbox
