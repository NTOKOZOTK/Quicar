"use client"

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const baseClasses = "btn"
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    white: "btn-white",
    ghost: "btn-ghost",
  }
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    icon: "btn-icon",
  }

  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ")

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading && <span className="loading-spinner"></span>}
      {children}
    </button>
  )
}

export default Button
