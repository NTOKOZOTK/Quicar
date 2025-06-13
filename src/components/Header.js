"use client"

import { useNavigate } from "react-router-dom"
import Button from "./Button"

function Header({ title, backButton, onBack }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <header className="header">
      {backButton && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="back-button">
          ← Back
        </Button>
      )}
     {title ? (
  <h1 className="header-title">{title}</h1>
) : (
  <div className="header-logo flex items-center space-x-2">
    <img src="/logo1.png" alt="QUICAR Logo" className="w-50 h-50 object-contain" />
    <span className="app-name text-lg font-semibold">QUICAR</span>
  </div>
)}

      <div className="header-avatar">
        <div className="avatar">SA</div>
      </div>
    </header>
  )
}

export default Header
