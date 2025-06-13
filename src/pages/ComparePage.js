"use client"

import { Link } from "react-router-dom"
import { FaArrowLeft, FaTimes, FaCheck, FaTimes as FaX } from "react-icons/fa"
import { useApp } from "../context/AppContext"

function ComparePage() {
  const { state, dispatch } = useApp()

  const compareList = state.cars.filter((car) => state.compareList.includes(car.id))

  const removeFromCompare = (id) => {
    dispatch({ type: "REMOVE_FROM_COMPARE", payload: id })
  }

  const clearAll = () => {
    dispatch({ type: "CLEAR_COMPARE" })
  }

  if (compareList.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-orange-500 text-white p-4 flex items-center">
          <Link to="/home">
            <button className="mr-3 text-white hover:bg-white/10 p-2 rounded-full">
              <FaArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <h1 className="font-bold text-xl">Compare Cars</h1>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h2 className="text-xl font-bold mb-2">No cars to compare</h2>
            <p className="text-gray-600 mb-4">Add cars from the home page to start comparing</p>
            <Link to="/home">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Browse Cars
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const features = [
    "Price",
    "Year",
    "Mileage",
    "Fuel Type",
    "Transmission",
    "Body Type",
    "Color",
    "Condition",
    "Rating",
    "Reviews",
    "Location",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-orange-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/home">
            <button className="mr-3 text-white hover:bg-white/10 p-2 rounded-full">
              <FaArrowLeft className="h-5 w-5" />
            </button>
          </Link>
          <h1 className="font-bold text-xl">Compare Cars</h1>
        </div>
        <button
          onClick={clearAll}
          className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
        >
          Clear All
        </button>
      </header>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-medium text-gray-700 sticky left-0 bg-gray-50">Features</th>
                  {compareList.map((car) => (
                    <th key={car.id} className="p-4 text-center min-w-64">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(car.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={car.title}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-bold text-sm">{car.title}</h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Price</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      <span className="font-bold text-orange-600">R{car.price.toLocaleString()}</span>
                      <div className="text-xs text-gray-500 mt-1">R{car.monthly}/month</div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Year</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.year}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Mileage</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.mileage.toLocaleString()} km
                    </td>
                  ))}
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Fuel Type</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.fuelType}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Transmission</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.transmission}
                    </td>
                  ))}
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Body Type</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.bodyType}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Color</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.color}
                    </td>
                  ))}
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Condition</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          car.condition === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : car.condition === "Good"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.condition}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Rating</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{car.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({car.reviews})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Location</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      {car.location}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700 sticky left-0 bg-white">Actions</td>
                  {compareList.map((car) => (
                    <td key={car.id} className="p-4 text-center">
                      <div className="space-y-2">
                        <Link to={`/car/${car.id}`}>
                          <button className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                            View Details
                          </button>
                        </Link>
                        <Link to={`/checkout/${car.id}`}>
                          <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Feature Comparison</h2>
          <div className="space-y-4">
            {compareList[0]?.features && (
              <div>
                <h3 className="font-medium mb-2">Standard Features</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 sticky left-0 bg-white">Feature</th>
                        {compareList.map((car) => (
                          <th key={car.id} className="text-center p-2 min-w-32">
                            {car.make} {car.model}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(new Set(compareList.flatMap((car) => car.features))).map((feature) => (
                        <tr key={feature} className="border-t">
                          <td className="p-2 sticky left-0 bg-white">{feature}</td>
                          {compareList.map((car) => (
                            <td key={car.id} className="p-2 text-center">
                              {car.features.includes(feature) ? (
                                <FaCheck className="h-4 w-4 text-green-500 mx-auto" />
                              ) : (
                                <FaX className="h-4 w-4 text-red-500 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparePage
