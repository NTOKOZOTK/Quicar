"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, useState } from "react"

const AppContext = createContext<any>(null)

// Initial state without localStorage
const initialState = {
  user: null,
  favorites: [],
  cars: [
    {
      id: 1,
      title: "2022 Toyota Corolla",
      price: 289000,
      monthly: 5200,
      location: "Durban",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      bestMatch: true,
      year: 2022,
      mileage: 15000,
      fuelType: "Petrol",
      transmission: "Automatic",
      description:
        "This Toyota Corolla is in excellent condition with low mileage. It comes with a full service history and is still under manufacturer warranty.",
      features: ["Bluetooth", "Reverse Camera", "Cruise Control", "Climate Control", "Alloy Wheels"],
      dealer: {
        name: "PrimeDrive Motors",
        rating: 4.8,
        verified: true,
      },
    },
    {
      id: 2,
      title: "2021 Volkswagen Polo",
      price: 245000,
      monthly: 4400,
      location: "Johannesburg",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      bestMatch: false,
      year: 2021,
      mileage: 22000,
      fuelType: "Petrol",
      transmission: "Manual",
      description:
        "Well-maintained Volkswagen Polo with excellent fuel economy. Perfect for city driving with all essential features.",
      features: ["Air Conditioning", "Power Steering", "Electric Windows", "Central Locking", "Radio/CD"],
      dealer: {
        name: "AutoMax Dealers",
        rating: 4.5,
        verified: true,
      },
    },
    {
      id: 3,
      title: "2020 Hyundai i20",
      price: 199000,
      monthly: 3600,
      location: "Cape Town",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      bestMatch: true,
      year: 2020,
      mileage: 35000,
      fuelType: "Petrol",
      transmission: "Automatic",
      description: "Reliable and economical Hyundai i20 with modern features. Great first car or city commuter.",
      features: ["Touchscreen Display", "Bluetooth", "USB Connectivity", "Steering Wheel Controls", "ABS"],
      dealer: {
        name: "City Motors",
        rating: 4.6,
        verified: true,
      },
    },
  ],
}

function appReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "TOGGLE_FAVORITE":
      const carId = action.payload
      const isFavorite = state.favorites.includes(carId)
      const newFavorites = isFavorite
        ? state.favorites.filter((id: number) => id !== carId)
        : [...state.favorites, carId]

      // Save to localStorage only on the client side
      if (typeof window !== "undefined") {
        localStorage.setItem("quicar-favorites", JSON.stringify(newFavorites))
      }
      return { ...state, favorites: newFavorites }
    case "INIT_FAVORITES":
      return { ...state, favorites: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [isClient, setIsClient] = useState(false)

  // Initialize favorites from localStorage only on the client side
  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("quicar-favorites")
      if (storedFavorites) {
        dispatch({ type: "INIT_FAVORITES", payload: JSON.parse(storedFavorites) })
      }
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
