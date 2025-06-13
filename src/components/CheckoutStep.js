"use client"
import Input from "./Input"

function CheckoutStep({ step, car, formData, updateFormData }) {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value })
  }

  switch (step) {
    case 1:
      return (
        <div className="checkout-step">
          <h2>Your Offer</h2>
          <div className="offer-details">
            <div className="price-row">
              <span>Vehicle Price</span>
              <span>R{car.price.toLocaleString()}</span>
            </div>

            <div className="trade-in-section">
              <label>
                <input
                  type="checkbox"
                  checked={formData.tradeIn || false}
                  onChange={(e) => handleInputChange("tradeIn", e.target.checked)}
                />
                I have a vehicle to trade in
              </label>

              {formData.tradeIn && (
                <div className="trade-in-form">
                  <Input placeholder="Make" />
                  <Input placeholder="Model" />
                  <Input placeholder="Year" />
                  <Input placeholder="Mileage" />
                </div>
              )}
            </div>

            <div className="financing-summary">
              <h3>Financing Options</h3>
              <div className="finance-row">
                <span>Down Payment</span>
                <span>R50,000</span>
              </div>
              <div className="finance-row">
                <span>Monthly Payment</span>
                <span>R5,200</span>
              </div>
              <div className="finance-row">
                <span>Term</span>
                <span>36 months</span>
              </div>
            </div>
          </div>
        </div>
      )

    case 2:
      return (
        <div className="checkout-step">
          <h2>Digital Contract</h2>
          <div className="contract-content">
            <div className="contract-text">
              <h3>Vehicle Purchase Agreement</h3>
              <p>This Vehicle Purchase Agreement is made between QUICAR and the undersigned buyer.</p>
              <h4>1. Vehicle Description</h4>
              <p>{car.title}</p>
              <h4>2. Purchase Price</h4>
              <p>R{car.price.toLocaleString()}</p>
              <h4>3. Payment Terms</h4>
              <p>As agreed in the financing terms.</p>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={formData.termsAccepted || false}
                onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
              />
              I have read and agree to the terms and conditions
            </label>

            <div className="signature-area">
              <h3>E-Signature</h3>
              <div className="signature-box">
                <p>Sign here</p>
              </div>
            </div>
          </div>
        </div>
      )

    case 3:
      return (
        <div className="checkout-step">
          <h2>Payment</h2>
          <div className="payment-form">
            <Input placeholder="Card Number" />
            <div className="card-details">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVV" />
            </div>
            <Input placeholder="Cardholder Name" />

            <div className="payment-summary">
              <div className="total-row">
                <span>Total Amount</span>
                <span>R{car.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )

    case 4:
      return (
        <div className="checkout-step">
          <h2>Delivery Details</h2>
          <div className="delivery-form">
            <Input placeholder="Street Address" />
            <div className="address-details">
              <Input placeholder="City" />
              <Input placeholder="Postal Code" />
            </div>
            <Input placeholder="Phone Number" />
            <Input placeholder="Delivery Instructions (Optional)" />

            <div className="delivery-info">
              <h3>Estimated Delivery</h3>
              <p>Your vehicle will be delivered within 7 business days.</p>
            </div>
          </div>
        </div>
      )

    default:
      return <div>Invalid step</div>
  }
}

export default CheckoutStep
