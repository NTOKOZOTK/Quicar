"use client"

import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"
import Button from "./Button"

function CarCard({ car }) {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const isFavorite = state.favorites.includes(car.id)

  const toggleFavorite = (e) => {
    e.stopPropagation()
    dispatch({ type: "TOGGLE_FAVORITE", payload: car.id })
  }

  return (
    <div className="car-card" onClick={() => navigate(`/car/${car.id}`)}>
      <div className="car-image-container">
        <img src={car.image || "/placeholder.svg"} alt={car.title} className="car-image" />
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {car.bestMatch && <div className="best-match-badge">🤖 Best Match</div>}
      </div>

      <div className="car-info">
        <div className="car-header">
          <h3 className="car-title">{car.title}</h3>
          <span className="car-price">R{car.price.toLocaleString()}</span>
        </div>

        <div className="car-details">
          <span className="monthly-payment">Est. R{car.monthly}/month</span>
          <div className="car-rating">
            <span>★ {car.rating}</span>
          </div>
        </div>

        <div className="car-footer">
          <div className="car-location">📍 {car.location}</div>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/car/${car.id}`)
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CarCard
