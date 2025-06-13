"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { FaSearch, FaMapMarkerAlt, FaHeart, FaRegHeart, FaRobot, FaCommentDots } from "react-icons/fa"
import { MdMenu, MdHome, MdFavorite, MdMoreHoriz } from "react-icons/md"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

const cars = [
  {
    id: 1,
    title: "2022 Toyota Corolla",
    price: 289000,
    monthly: 5200,
    location: "Durban",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    bestMatch: true,
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
  },
]

export default function HomePage() {
  const [budget, setBudget] = useState([350000])
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("home")

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#FF9500] text-white p-4 flex justify-between items-center">
        <button className="p-2 rounded-full bg-white/10">
          <MdMenu className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <div className="bg-black rounded-lg p-1 mr-1">
            <div className="rounded-full bg-[#FF5722] w-5 h-5"></div>
          </div>
          <span className="font-bold text-xl">UICAR</span>
        </div>
        <Avatar className="h-9 w-9 bg-white/10">
          <span className="text-white font-medium">SA</span>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Find Your Perfect Car</h1>
          <p className="text-gray-600">with AI-Powered Search</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <Input placeholder="Search make or model" className="border-none bg-gray-100" />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Budget</span>
              <span className="font-medium">R{budget[0].toLocaleString()}</span>
            </div>
            <Slider defaultValue={[350000]} max={500000} step={10000} onValueChange={setBudget} className="py-4" />
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-1" />
              <span className="text-sm">Durban</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs border-[#FF5722] text-[#FF5722]">
              Change
            </Button>
          </div>

          <Button className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white">
            <FaRobot className="mr-2" /> Suggest for Me
          </Button>
        </div>

        {/* Car Listings */}
        <div className="space-y-4">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative">
                <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-full h-48 object-cover" />
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80"
                >
                  {favorites.includes(car.id) ? (
                    <FaHeart className="h-5 w-5 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                {car.bestMatch && (
                  <div className="absolute bottom-2 left-2 bg-[#FF5722] text-white text-xs py-1 px-2 rounded-full flex items-center">
                    <FaRobot className="mr-1" /> Best Match
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{car.title}</h3>
                  <span className="font-bold text-[#FF5722]">R{car.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Est. R{car.monthly}/month</span>
                  <div className="flex items-center">
                    <span className="mr-1">★</span>
                    <span>{car.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{car.location}</span>
                  </div>
                  <Link href={`/car/${car.id}`}>
                    <Button size="sm" variant="outline" className="text-xs border-[#FF5722] text-[#FF5722]">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-[#FF5722]" : "text-gray-500"}`}
            onClick={() => setActiveTab("home")}
          >
            <MdHome className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "favorites" ? "text-[#FF5722]" : "text-gray-500"}`}
            onClick={() => setActiveTab("favorites")}
          >
            <MdFavorite className="h-6 w-6" />
            <span className="text-xs mt-1">Favorites</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "chat" ? "text-[#FF5722]" : "text-gray-500"}`}
            onClick={() => setActiveTab("chat")}
          >
            <FaCommentDots className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === "more" ? "text-[#FF5722]" : "text-gray-500"}`}
            onClick={() => setActiveTab("more")}
          >
            <MdMoreHoriz className="h-6 w-6" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
