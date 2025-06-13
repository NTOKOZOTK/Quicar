"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AppContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: [],
  cart: [],
  currentStep: 0,
  searchQuery: "",
  filters: {
    priceRange: [50000, 500000], // South African Rand pricing
    yearRange: [2015, 2024],
    mileageMax: 100000,
    fuelType: "all",
    transmission: "all",
    location: "all",
  },
  notifications: [],
  chatMessages: [],
  compareList: [],
  creditScore: 720, // TransUnion credit score
  verificationData: {
    idVerified: false,
    selfieVerified: false,
    creditChecked: false,
  },
  // South African car data with proper locations and pricing
  cars: [
    {
      id: 1,
      title: "2022 Toyota Corolla",
      make: "Toyota",
      model: "Corolla",
      price: 289000, // ZAR
      monthly: 5200, // ZAR
      location: "Durban, KZN",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=200&width=300",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      bestMatch: true,
      year: 2022,
      mileage: 15000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "Sedan",
      color: "White",
      condition: "Excellent",
      description:
        "This Toyota Corolla is in excellent condition with low mileage. Full service history available. Still under manufacturer warranty.",
      features: [
        "Bluetooth Connectivity",
        "Reverse Camera",
        "Cruise Control",
        "Climate Control",
        "Alloy Wheels",
        "USB Ports",
        "Electric Windows",
        "Central Locking",
      ],
      safetyFeatures: ["ABS", "Dual Airbags", "Electronic Stability Control", "Traction Control"],
      dealer: {
        id: 1,
        name: "PrimeDrive Motors",
        rating: 4.8,
        verified: true,
        phone: "+27 31 123 4567",
        email: "info@primedrive.co.za",
        address: "123 Umgeni Road, Durban, KZN",
        image: "/placeholder.svg?height=100&width=100",
        popiaCertified: true,
      },
      history: {
        accidents: 0,
        owners: 1,
        serviceRecords: 8,
        lastService: "2024-01-15",
        roadworthyCertificate: true,
      },
      financing: {
        eligible: true,
        maxLoanAmount: 260000,
        interestRate: 8.5,
        minDeposit: 29000,
      },
    },
    {
      id: 2,
      title: "2021 Volkswagen Polo Vivo",
      make: "Volkswagen",
      model: "Polo Vivo",
      price: 245000,
      monthly: 4400,
      location: "Johannesburg, GP",
      rating: 4.5,
      reviews: 89,
      image: "/placeholder.svg?height=200&width=300",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      bestMatch: false,
      year: 2021,
      mileage: 22000,
      fuelType: "Petrol",
      transmission: "Manual",
      bodyType: "Hatchback",
      color: "Red",
      condition: "Good",
      description: "Well-maintained Volkswagen Polo Vivo with excellent fuel economy. Perfect for city driving.",
      features: ["Air Conditioning", "Power Steering", "Electric Windows", "Central Locking", "Radio/CD"],
      safetyFeatures: ["ABS", "Driver Airbag", "Electronic Stability Control"],
      dealer: {
        id: 2,
        name: "AutoMax Dealers",
        rating: 4.5,
        verified: true,
        phone: "+27 11 987 6543",
        email: "sales@automax.co.za",
        address: "456 Commissioner Street, Johannesburg, GP",
        image: "/placeholder.svg?height=100&width=100",
        popiaCertified: true,
      },
      history: {
        accidents: 0,
        owners: 2,
        serviceRecords: 12,
        lastService: "2023-11-20",
        roadworthyCertificate: true,
      },
      financing: {
        eligible: true,
        maxLoanAmount: 220000,
        interestRate: 9.0,
        minDeposit: 25000,
      },
    },
    {
      id: 3,
      title: "2020 Hyundai i20",
      make: "Hyundai",
      model: "i20",
      price: 199000,
      monthly: 3600,
      location: "Cape Town, WC",
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      bestMatch: true,
      year: 2020,
      mileage: 35000,
      fuelType: "Petrol",
      transmission: "Automatic",
      bodyType: "Hatchback",
      color: "Blue",
      condition: "Good",
      description: "Reliable and economical Hyundai i20 with modern features. Great first car or city commuter.",
      features: ["Touchscreen Display", "Bluetooth", "USB Connectivity", "Steering Wheel Controls", "ABS"],
      safetyFeatures: ["ABS", "Dual Airbags", "Electronic Stability Control", "Hill Start Assist"],
      dealer: {
        id: 3,
        name: "City Motors Cape Town",
        rating: 4.6,
        verified: true,
        phone: "+27 21 555 0123",
        email: "contact@citymotors.co.za",
        address: "789 Main Road, Cape Town, WC",
        image: "/placeholder.svg?height=100&width=100",
        popiaCertified: true,
      },
      history: {
        accidents: 0,
        owners: 1,
        serviceRecords: 15,
        lastService: "2024-02-10",
        roadworthyCertificate: true,
      },
      financing: {
        eligible: true,
        maxLoanAmount: 179000,
        interestRate: 8.75,
        minDeposit: 20000,
      },
    },
  ],
  // South African provinces for location filtering
  provinces: [
    { code: "kzn", name: "KwaZulu-Natal", cities: ["Durban", "Pietermaritzburg", "Newcastle"] },
    { code: "gp", name: "Gauteng", cities: ["Johannesburg", "Pretoria", "Germiston"] },
    { code: "wc", name: "Western Cape", cities: ["Cape Town", "Stellenbosch", "George"] },
    { code: "ec", name: "Eastern Cape", cities: ["Port Elizabeth", "East London", "Grahamstown"] },
    { code: "fs", name: "Free State", cities: ["Bloemfontein", "Welkom", "Kroonstad"] },
    { code: "lp", name: "Limpopo", cities: ["Polokwane", "Tzaneen", "Thohoyandou"] },
    { code: "mp", name: "Mpumalanga", cities: ["Nelspruit", "Witbank", "Secunda"] },
    { code: "nc", name: "Northern Cape", cities: ["Kimberley", "Upington", "Springbok"] },
    { code: "nw", name: "North West", cities: ["Mahikeng", "Potchefstroom", "Klerksdorp"] },
  ],
}

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        favorites: [],
        compareList: [],
      }
    case "TOGGLE_FAVORITE":
      const carId = action.payload
      const isFavorite = state.favorites.includes(carId)
      const newFavorites = isFavorite ? state.favorites.filter((id) => id !== carId) : [...state.favorites, carId]

      // Save to localStorage
      localStorage.setItem("quicar-favorites", JSON.stringify(newFavorites))
      return {
        ...state,
        favorites: newFavorites,
      }
    case "INIT_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      }
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      }
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      }
    case "RESET_FILTERS":
      return {
        ...state,
        filters: initialState.filters,
        searchQuery: "",
      }
    case "ADD_TO_COMPARE":
      if (state.compareList.length >= 3) {
        return state // Max 3 cars for comparison
      }
      return {
        ...state,
        compareList: [...state.compareList, action.payload],
      }
    case "REMOVE_FROM_COMPARE":
      return {
        ...state,
        compareList: state.compareList.filter((id) => id !== action.payload),
      }
    case "CLEAR_COMPARE":
      return {
        ...state,
        compareList: [],
      }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload,
            timestamp: new Date(),
          },
        ],
      }
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      }
    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      }
    case "UPDATE_VERIFICATION":
      return {
        ...state,
        verificationData: {
          ...state.verificationData,
          ...action.payload,
        },
      }
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "UPDATE_CREDIT_SCORE":
      return {
        ...state,
        creditScore: action.payload,
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("quicar-favorites")
    if (storedFavorites) {
      dispatch({ type: "INIT_FAVORITES", payload: JSON.parse(storedFavorites) })
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
