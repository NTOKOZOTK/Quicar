"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaRobot,
  FaCommentDots,
  FaFilter,
  FaCompressArrowsAlt,
  FaStar,
  FaEye,
  FaCar,
  FaGasPump,
  FaCog,
  FaTachometerAlt,
  FaShieldAlt,
  FaWifi,
  FaSignal,
} from "react-icons/fa"
import { MdMenu, MdHome, MdFavorite, MdMoreHoriz, MdCompare, MdVerified } from "react-icons/md"
import { useApp } from "../context/AppContext"

// South African car data with proper Rand pricing
const southAfricanCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 289000,
    image: "/corola.jpeg?height=200&width=300",
    mileage: 15000,
    location: "Durban, KZN",
    fuelType: "Petrol",
    transmission: "Automatic",
    rating: 4.8,
    reviews: 124,
    monthly: 5200,
    bestMatch: true,
    dealer: "PrimeDrive Motors",
    verified: true,
    condition: "Excellent",
    bodyType: "Sedan",
  },
  {
    id: 2,
    make: "Volkswagen",
    model: "Polo Vivo",
    year: 2021,
    price: 245000,
    image: "/polo.jpeg?height=200&width=300",
    mileage: 22000,
    location: "Johannesburg, GP",
    fuelType: "Petrol",
    transmission: "Manual",
    rating: 4.5,
    reviews: 89,
    monthly: 4400,
    bestMatch: false,
    dealer: "AutoMax Dealers",
    verified: true,
    condition: "Good",
    bodyType: "Hatchback",
  },
  {
    id: 3,
    make: "Hyundai",
    model: "i20",
    year: 2020,
    price: 199000,
    image: "/i20.jpeg?height=200&width=300",
    mileage: 35000,
    location: "Cape Town, WC",
    fuelType: "Petrol",
    transmission: "Automatic",
    rating: 4.6,
    reviews: 156,
    monthly: 3600,
    bestMatch: true,
    dealer: "City Motors",
    verified: true,
    condition: "Good",
    bodyType: "Hatchback",
  },
  {
    id: 4,
    make: "Ford",
    model: "EcoSport",
    year: 2023,
    price: 320000,
    image: "/EcoS.jpeg?height=200&width=300",
    mileage: 8000,
    location: "Pretoria, GP",
    fuelType: "Petrol",
    transmission: "Automatic",
    rating: 4.7,
    reviews: 67,
    monthly: 5800,
    bestMatch: false,
    dealer: "Ford Dealership",
    verified: true,
    condition: "Excellent",
    bodyType: "SUV",
  },
  {
    id: 5,
    make: "Nissan",
    model: "Micra",
    year: 2021,
    price: 215000,
    image: "/micra.jpeg?height=200&width=300",
    mileage: 18000,
    location: "Durban, KZN",
    fuelType: "Petrol",
    transmission: "CVT",
    rating: 4.4,
    reviews: 93,
    monthly: 3900,
    bestMatch: true,
    dealer: "Nissan Motors",
    verified: true,
    condition: "Excellent",
    bodyType: "Hatchback",
  },
  {
    id: 6,
    make: "Suzuki",
    model: "Swift",
    year: 2022,
    price: 235000,
    image: "/swift.png?height=200&width=300",
    mileage: 12000,
    location: "Port Elizabeth, EC",
    fuelType: "Petrol",
    transmission: "Manual",
    rating: 4.3,
    reviews: 78,
    monthly: 4200,
    bestMatch: false,
    dealer: "Suzuki Auto",
    verified: true,
    condition: "Excellent",
    bodyType: "Hatchback",
  },
]

function HomePage() {
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [viewMode, setViewMode] = useState("grid")
  const [lowDataMode, setLowDataMode] = useState(false)
  const { state, dispatch } = useApp()

  const toggleFavorite = (id) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id })
  }

  const addToCompare = (id) => {
    if (state.compareList.length >= 3) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "warning",
          message: "You can only compare up to 3 cars",
        },
      })
      return
    }
    dispatch({ type: "ADD_TO_COMPARE", payload: id })
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: "Car added to comparison list",
      },
    })
  }

  const filteredCars = useMemo(() => {
    let filtered = southAfricanCars

    // Search filter
    if (state.searchQuery) {
      filtered = filtered.filter(
        (car) =>
          car.make.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          car.location.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    }

    // Price filter
    filtered = filtered.filter(
      (car) => car.price >= state.filters.priceRange[0] && car.price <= state.filters.priceRange[1],
    )

    // Year filter
    filtered = filtered.filter(
      (car) => car.year >= state.filters.yearRange[0] && car.year <= state.filters.yearRange[1],
    )

    // Mileage filter
    filtered = filtered.filter((car) => car.mileage <= state.filters.mileageMax)

    // Fuel type filter
    if (state.filters.fuelType !== "all") {
      filtered = filtered.filter((car) => car.fuelType.toLowerCase() === state.filters.fuelType.toLowerCase())
    }

    // Transmission filter
    if (state.filters.transmission !== "all") {
      filtered = filtered.filter((car) => car.transmission.toLowerCase() === state.filters.transmission.toLowerCase())
    }

    // Location filter
    if (state.filters.location !== "all") {
      filtered = filtered.filter((car) => car.location.toLowerCase().includes(state.filters.location.toLowerCase()))
    }

    return filtered
  }, [state.searchQuery, state.filters])

  const displayCars =
    activeTab === "favorites" ? southAfricanCars.filter((car) => state.favorites.includes(car.id)) : filteredCars

  const updateFilter = (key, value) => {
    dispatch({ type: "UPDATE_FILTERS", payload: { [key]: value } })
  }

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("ZAR", "R")
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lowDataMode ? "low-data-mode" : ""}`}>
      {/* Header */}
      <header className="header">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <MdMenu className="h-6 w-6" />
        </button>
        <div className="header-logo">
          <div className="logo">
            <div className="logo-circle"></div>
          </div>
          <span className="app-name">QUICAR</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Low Data Mode Toggle */}
          <button
            onClick={() => setLowDataMode(!lowDataMode)}
            className={`p-2 rounded-full transition-colors ${lowDataMode ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
            title="Low Data Mode"
          >
            <FaSignal className="h-4 w-4" />
          </button>

          {/* Compare Counter */}
          {state.compareList.length > 0 && (
            <Link to="/compare" className="relative">
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <MdCompare className="h-5 w-5" />
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.compareList.length}
              </span>
            </Link>
          )}

          {/* User Avatar */}
          <div className="h-9 w-9 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">{state.user?.name?.charAt(0) || "U"}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Find Your Perfect Car</h1>
          <p className="text-gray-600">with AI-Powered Search • Powered by PrimeDrive</p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="trust-indicator">
              <FaShieldAlt className="h-3 w-3" />
              <span>POPIA Compliant</span>
            </div>
            <div className="trust-indicator">
              <MdVerified className="h-3 w-3" />
              <span>TransUnion Verified</span>
            </div>
            <div className="trust-indicator">
              <FaWifi className="h-3 w-3" />
              <span>Secure Encryption</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Container */}
        <div className="search-container">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search make, model, or location in SA..."
              className="search-input"
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`ml-2 p-2 rounded-lg transition-colors ${showFilters ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FaFilter className="h-4 w-4" />
            </button>
          </div>

          {/* Budget Slider - Linked to Credit Score */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Budget (Based on your credit score)</span>
              <span className="text-sm text-orange-600 font-semibold">
                {formatPrice(state.filters.priceRange[0])} - {formatPrice(state.filters.priceRange[1])}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={state.filters.priceRange[1]}
                onChange={(e) => updateFilter("priceRange", [50000, Number.parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--primary-orange) 0%, var(--primary-orange) ${((state.filters.priceRange[1] - 50000) / (500000 - 50000)) * 100}%, #e5e7eb ${((state.filters.priceRange[1] - 50000) / (500000 - 50000)) * 100}%, #e5e7eb 100%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>R50k</span>
              <span>R500k</span>
            </div>
          </div>

          {/* Location Toggle */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-sm">Show cars near Durban, KZN</span>
            </div>
            <button className="btn btn-outline btn-sm">Change</button>
          </div>

          {/* AI Suggest Button */}
          <button className="btn btn-primary w-full">
            <FaRobot className="mr-2" />
            Suggest for Me (AI-Powered)
          </button>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 mt-4 space-y-4">
              {/* Year Range */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Year Range</span>
                  <span className="text-sm text-gray-500">
                    {state.filters.yearRange[0]} - {state.filters.yearRange[1]}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="range"
                    min="2010"
                    max="2024"
                    value={state.filters.yearRange[0]}
                    onChange={(e) =>
                      updateFilter("yearRange", [Number.parseInt(e.target.value), state.filters.yearRange[1]])
                    }
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="2010"
                    max="2024"
                    value={state.filters.yearRange[1]}
                    onChange={(e) =>
                      updateFilter("yearRange", [state.filters.yearRange[0], Number.parseInt(e.target.value)])
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    value={state.filters.fuelType}
                    onChange={(e) => updateFilter("fuelType", e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Types</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    value={state.filters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Provinces</option>
                    <option value="kzn">KwaZulu-Natal</option>
                    <option value="gp">Gauteng</option>
                    <option value="wc">Western Cape</option>
                    <option value="ec">Eastern Cape</option>
                    <option value="fs">Free State</option>
                    <option value="lp">Limpopo</option>
                    <option value="mp">Mpumalanga</option>
                    <option value="nc">Northern Cape</option>
                    <option value="nw">North West</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-2">
                <button onClick={resetFilters} className="btn btn-outline">
                  Reset Filters
                </button>
                <button className="btn btn-primary">Apply Filters</button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">
              {displayCars.length} car{displayCars.length !== 1 ? "s" : ""} found
            </span>
            {activeTab === "favorites" && (
              <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium">
                Favorites
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current h-1 rounded"></div>
                <div className="bg-current h-1 rounded"></div>
                <div className="bg-current h-1 rounded"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Car Listings */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
          {displayCars.map((car) => (
            <div key={car.id} className={`car-card ${viewMode === "list" ? "flex" : ""}`}>
              <div className={`car-image-container ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                {lowDataMode ? (
                  <div className="car-image bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                      🚗 {car.make} {car.model}
                    </span>
                  </div>
                ) : (
                  <img src={car.image || "/placeholder.svg"} alt={`${car.make} ${car.model}`} className="car-image" />
                )}

                <button onClick={() => toggleFavorite(car.id)} className="favorite-button">
                  {state.favorites.includes(car.id) ? (
                    <FaHeart className="h-4 w-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-4 w-4 text-gray-600" />
                  )}
                </button>

                {car.bestMatch && (
                  <div className="best-match-badge">
                    <FaRobot className="h-3 w-3" />
                    Best Match
                  </div>
                )}

                {car.verified && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
                    <MdVerified className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>

              <div className="car-info">
                <div className="car-header">
                  <h3 className="car-title">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <span className="car-price">{formatPrice(car.price)}</span>
                </div>

                <div className="car-details">
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium text-gray-700">{car.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({car.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                    <span>{car.location}</span>
                  </div>
                </div>

                <div className="car-specs">
                  <div className="car-spec">
                    <FaTachometerAlt className="h-3 w-3" />
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="car-spec">
                    <FaGasPump className="h-3 w-3" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="car-spec">
                    <FaCog className="h-3 w-3" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="car-spec">
                    <FaCar className="h-3 w-3" />
                    <span>{car.bodyType}</span>
                  </div>
                </div>

                <div className="car-footer">
                  <div className="text-sm text-gray-600">Est. {formatPrice(car.monthly)}/month</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCompare(car.id)}
                      disabled={state.compareList.includes(car.id) || state.compareList.length >= 3}
                      className="btn btn-outline btn-sm"
                    >
                      <FaCompressArrowsAlt className="h-3 w-3 mr-1" />
                      Compare
                    </button>
                    <Link to={`/car/${car.id}`}>
                      <button className="btn btn-primary btn-sm">
                        <FaEye className="h-3 w-3 mr-1" />
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {displayCars.length === 0 && (
          <div className="text-center py-12">
            <FaCar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        )}

        {/* Township Testimonials Section */}
        <div className="mt-8 bg-white rounded-xl shadow p-6 township-pattern">
          <h3 className="text-lg font-bold mb-4 text-gray-800">What Our Customers Say</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                T
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  "QUICAR made buying my first car so easy! The whole process was done online and my car was delivered
                  to Umlazi." - Thabo M., KZN
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                N
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  "The AI suggestions were perfect for my budget. Got my Toyota Corolla with great financing!" - Nomsa
                  K., Johannesburg
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-items">
          <button className={`nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
            <MdHome className="h-6 w-6" />
            <span>Home</span>
          </button>
          <button
            className={`nav-item ${activeTab === "favorites" ? "active" : ""} relative`}
            onClick={() => setActiveTab("favorites")}
          >
            <MdFavorite className="h-6 w-6" />
            <span>Favorites</span>
            {state.favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.favorites.length}
              </span>
            )}
          </button>
          <Link to="/chat">
            <button className="nav-item">
              <FaCommentDots className="h-6 w-6" />
              <span>Chat</span>
            </button>
          </Link>
          <Link to="/profile">
            <button className="nav-item">
              <MdMoreHoriz className="h-6 w-6" />
              <span>More</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
