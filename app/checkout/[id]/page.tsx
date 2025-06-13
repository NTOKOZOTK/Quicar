"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/app/context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FaArrowLeft, FaMoneyBillWave, FaFileContract, FaTruck, FaCheck } from "react-icons/fa"
import { Progress } from "@/components/ui/progress"

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [tradeIn, setTradeIn] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()
  const { state } = useApp()

  // Find the car by ID
  const car = state.cars.find((c: any) => c.id === Number(params.id))

  // If car not found, redirect to home
  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Car not found</p>
        <Button onClick={() => router.push("/home")} className="mt-4">
          Go back to home
        </Button>
      </div>
    )
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Complete purchase
      router.push("/success")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push(`/car/${car.id}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#FF9500] text-white p-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10" onClick={handleBack}>
          <FaArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-xl">Checkout</h1>
      </header>

      {/* Progress Bar */}
      <div className="bg-white p-4 border-b">
        <Progress value={(step / 4) * 100} className="h-2 bg-gray-100" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-[#FF5722]" : ""}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? "bg-[#FF5722] text-white" : "bg-gray-200"}`}
            >
              <FaMoneyBillWave className="h-3 w-3" />
            </div>
            <span>Offer</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-[#FF5722]" : ""}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? "bg-[#FF5722] text-white" : "bg-gray-200"}`}
            >
              <FaFileContract className="h-3 w-3" />
            </div>
            <span>Contract</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-[#FF5722]" : ""}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? "bg-[#FF5722] text-white" : "bg-gray-200"}`}
            >
              <FaMoneyBillWave className="h-3 w-3" />
            </div>
            <span>Payment</span>
          </div>
          <div className={`flex flex-col items-center ${step >= 4 ? "text-[#FF5722]" : ""}`}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${step >= 4 ? "bg-[#FF5722] text-white" : "bg-gray-200"}`}
            >
              <FaTruck className="h-3 w-3" />
            </div>
            <span>Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Car Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center">
          <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-20 h-16 object-cover rounded mr-4" />
          <div>
            <h3 className="font-medium">{car.title}</h3>
            <p className="text-[#FF5722] font-bold">R{car.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">Your Offer</h2>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span>Vehicle Price</span>
                <span className="font-medium">R{car.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center mb-4">
                <Checkbox
                  id="trade-in"
                  checked={tradeIn}
                  onCheckedChange={(checked) => setTradeIn(checked as boolean)}
                  className="border-[#FF5722] text-[#FF5722]"
                />
                <label htmlFor="trade-in" className="ml-2 text-sm">
                  I have a vehicle to trade in
                </label>
              </div>

              {tradeIn && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-medium text-sm">Trade-In Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Make</label>
                      <Input placeholder="e.g. Toyota" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Model</label>
                      <Input placeholder="e.g. Corolla" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Year</label>
                      <Input placeholder="e.g. 2018" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Mileage</label>
                      <Input placeholder="e.g. 50000" className="mt-1" />
                    </div>
                  </div>
                  <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
                    Calculate Trade-In Value
                  </Button>
                </div>
              )}

              <div className="bg-[#FF9500]/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Financing Options</h3>
                <div className="flex justify-between py-2 border-b border-[#FF9500]/20">
                  <span>Down Payment</span>
                  <span className="font-medium">R50,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#FF9500]/20">
                  <span>Monthly Payment</span>
                  <span className="font-medium">R5,200</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Term</span>
                  <span className="font-medium">36 months</span>
                </div>
                <Button variant="outline" className="w-full mt-3 border-[#FF5722] text-[#FF5722]">
                  Adjust Financing
                </Button>
              </div>

              <div className="flex justify-between py-2 border-t border-b font-bold">
                <span>Total Price</span>
                <span className="text-[#FF5722]">R{car.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">Digital Contract</h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-4 h-64 overflow-y-auto text-sm text-gray-600">
              <h3 className="font-medium mb-2">Vehicle Purchase Agreement</h3>
              <p className="mb-2">
                This Vehicle Purchase Agreement ("Agreement") is made and entered into on{" "}
                {new Date().toLocaleDateString()}, by and between QUICAR ("Seller") and the undersigned ("Buyer").
              </p>

              <h4 className="font-medium mt-4 mb-1">1. Vehicle Description</h4>
              <p>2022 Toyota Corolla ("Vehicle")</p>

              <h4 className="font-medium mt-4 mb-1">2. Purchase Price</h4>
              <p>The Buyer agrees to purchase the Vehicle for the total purchase price of R289,000.</p>

              <h4 className="font-medium mt-4 mb-1">3. Payment Terms</h4>
              <p>The Buyer agrees to pay for the Vehicle according to the financing terms selected.</p>

              <h4 className="font-medium mt-4 mb-1">4. Delivery</h4>
              <p>
                The Seller agrees to deliver the Vehicle to the Buyer's specified address within 7 business days of
                payment confirmation.
              </p>

              <h4 className="font-medium mt-4 mb-1">5. Warranty</h4>
              <p>The Vehicle comes with the manufacturer's standard warranty.</p>
            </div>

            <div className="flex items-center mb-4">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                className="border-[#FF5722] text-[#FF5722]"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                I have read and agree to the terms and conditions
              </label>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">E-Signature</h3>
              <div className="border-2 border-dashed border-gray-300 h-32 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm">Sign here</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">Payment</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Card Number</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Expiry Date</label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">CVV</label>
                  <Input placeholder="123" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Cardholder Name</label>
                <Input placeholder="John Doe" />
              </div>

              <div className="flex justify-between py-2 border-t border-b">
                <span>Total Amount</span>
                <span className="font-bold text-[#FF5722]">R{car.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <FaCheck className="text-[#4FD1C5] mr-2" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">Delivery Details</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Delivery Address</label>
                <Input placeholder="Street Address" className="mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="City" />
                  <Input placeholder="Postal Code" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Contact Number</label>
                <Input placeholder="Phone Number" />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block">Delivery Instructions (Optional)</label>
                <Input placeholder="E.g., Gate code, landmark, etc." />
              </div>

              <div className="bg-[#4FD1C5]/10 p-4 rounded-lg">
                <h3 className="font-medium text-[#4FD1C5] mb-2">Estimated Delivery</h3>
                <p className="text-sm">Your vehicle will be delivered within 7 business days.</p>
                <p className="text-xs text-gray-500 mt-2">You will receive SMS updates about your delivery status.</p>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <FaCheck className="text-[#4FD1C5] mr-2" />
                <span>Free delivery within 50km of Durban</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button
          className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-8"
          onClick={handleNext}
          disabled={step === 2 && !termsAccepted}
        >
          {step === 4 ? "Complete Purchase" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
