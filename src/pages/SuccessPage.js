"use client"
import { useNavigate } from "react-router-dom"
import { FaCheckCircle, FaCalendarAlt, FaTruck, FaFileAlt } from "react-icons/fa"

function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] success-page">
      {/* Header */}
      <header className="bg-orange text-white p-4 flex items-center justify-center">
        <h1 className="font-bold text-xl">Purchase Complete</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md text-center success-container">
          <div className="mb-6">
            <FaCheckCircle className="h-16 w-16 text-[#4FD1C5] mx-auto success-icon" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your car will be delivered soon.</p>

          <div className="bg-[#4FD1C5]/10 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-1">Order Summary</h3>
            <p className="text-xl font-bold text-orange-dark mb-1">R289,000</p>
            <p className="text-xs text-gray-500">Order #QC12345678</p>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-orange/20 p-2 rounded-full mr-3">
                  <FaFileAlt className="h-5 w-5 text-orange-dark" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Documentation</p>
                  <p className="text-sm text-gray-500">
                    You'll receive all purchase documents via email within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange/20 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="h-5 w-5 text-orange-dark" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Delivery Scheduling</p>
                  <p className="text-sm text-gray-500">
                    Our team will contact you within 48 hours to schedule your delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-orange/20 p-2 rounded-full mr-3">
                  <FaTruck className="h-5 w-5 text-orange-dark" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Vehicle Delivery</p>
                  <p className="text-sm text-gray-500">
                    Your car will be delivered to your doorstep within 7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 success-actions">
            <button onClick={() => navigate("/home")} className="btn btn-primary w-full home-btn">
              Back to Home
            </button>
            <button className="btn btn-outline-orange w-full">View Order Details</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SuccessPage
