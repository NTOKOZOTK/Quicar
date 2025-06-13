"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function CheckoutPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personalInfo: {},
    financing: {},
    payment: {},
  })

  const steps = ["Personal Info", "Financing", "Payment"]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate("/success")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>Complete Your Purchase</h2>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        </div>

        <div className="step-indicator">
          {steps.map((step, index) => (
            <div key={index} className={`step ${index <= currentStep ? "active" : ""}`}>
              {step}
            </div>
          ))}
        </div>

        <div className="step-content">
          {currentStep === 0 && (
            <div className="personal-info-step">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone" />
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="City" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="financing-step">
              <h3>Financing Options</h3>
              <div className="financing-options">
                <label className="option">
                  <input type="radio" name="financing" value="cash" />
                  Pay in Full
                </label>
                <label className="option">
                  <input type="radio" name="financing" value="loan" />
                  Finance with Loan
                </label>
                <label className="option">
                  <input type="radio" name="financing" value="lease" />
                  Lease Option
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="payment-step">
              <h3>Payment Information</h3>
              <div className="payment-form">
                <input type="text" placeholder="Card Number" />
                <div className="card-details">
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVV" />
                </div>
                <input type="text" placeholder="Cardholder Name" />
              </div>
            </div>
          )}
        </div>

        <div className="checkout-actions">
          {currentStep > 0 && (
            <button onClick={handleBack} className="back-btn">
              Back
            </button>
          )}
          <button onClick={handleNext} className="next-btn">
            {currentStep === steps.length - 1 ? "Complete Purchase" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
