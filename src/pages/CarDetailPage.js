"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function CarDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loanAmount, setLoanAmount] = useState(20000)
  const [loanTerm, setLoanTerm] = useState(60)

  // Mock car data
  const car = {
    id: Number.parseInt(id),
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    image: "/placeholder.svg?height=400&width=600",
    mileage: 15000,
    location: "Lagos",
    description: "Well maintained Toyota Camry with full service history.",
    features: ["Air Conditioning", "Bluetooth", "Backup Camera", "Cruise Control"],
  }

  const monthlyPayment = ((loanAmount * 0.05) / 12) * loanTerm

  return (
    <div className="car-detail-page">
      <button onClick={() => navigate("/home")} className="back-btn">
        ← Back to Cars
      </button>

      <div className="car-detail-container">
        <div className="car-images">
          <img src={car.image || "/placeholder.svg"} alt={`${car.make} ${car.model}`} />
        </div>

        <div className="car-info">
          <h1>
            {car.make} {car.model} {car.year}
          </h1>
          <p className="car-price">${car.price.toLocaleString()}</p>
          <p className="car-location">
            {car.mileage} miles • {car.location}
          </p>

          <div className="car-description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          <div className="car-features">
            <h3>Features</h3>
            <ul>
              {car.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="finance-calculator">
            <h3>Finance Calculator</h3>
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Loan Amount: ${loanAmount.toLocaleString()}</label>
                <input
                  type="range"
                  min="5000"
                  max={car.price}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label>Loan Term: {loanTerm} months</label>
                <input
                  type="range"
                  min="12"
                  max="84"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number.parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="monthly-payment">
              <strong>Estimated Monthly Payment: ${monthlyPayment.toFixed(2)}</strong>
            </div>
          </div>

          <button onClick={() => navigate(`/checkout/${car.id}`)} className="buy-now-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarDetailPage
