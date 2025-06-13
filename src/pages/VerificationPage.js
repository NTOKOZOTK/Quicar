"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

function VerificationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const steps = [
    { title: "ID Verification", key: "idVerified" },
    { title: "Selfie Verification", key: "selfieVerified" },
    { title: "Credit Check", key: "creditChecked" },
  ]

  const handleStepComplete = () => {
    const currentStepKey = steps[currentStep].key
    dispatch({
      type: "UPDATE_VERIFICATION",
      payload: { [currentStepKey]: true },
    })

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate("/home")
    }
  }

  const handleSkip = () => {
    navigate("/home")
  }

  return (
    <div className="verification-page">
      <div className="verification-container">
        <h2>Account Verification</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        </div>

        <div className="verification-step">
          <h3>{steps[currentStep].title}</h3>
          <div className="step-content">
            {currentStep === 0 && (
              <div className="id-verification">
                <p>Please upload a clear photo of your ID</p>
                <div className="upload-area">
                  <p>Drag & drop or click to upload</p>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="selfie-verification">
                <p>Take a selfie to verify your identity</p>
                <div className="camera-area">
                  <p>Camera will open here</p>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="credit-check">
                <p>We'll perform a soft credit check</p>
                <div className="credit-info">
                  <p>This won't affect your credit score</p>
                </div>
              </div>
            )}
          </div>

          <div className="verification-actions">
            <button onClick={handleStepComplete} className="complete-btn">
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </button>
            <button onClick={handleSkip} className="skip-btn">
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage
