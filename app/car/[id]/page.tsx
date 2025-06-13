"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useApp } from "@/app/context/AppContext"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTachometerAlt,
  FaGasPump,
  FaCog,
  FaCheck,
  FaCommentDots,
} from "react-icons/fa"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [loanTerm, setLoanTerm] = useState([36])
  const [downPayment, setDownPayment] = useState([50000])
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

  const monthlyPayment = Math.round(
    ((car.price - downPayment[0]) * (0.085 / 12)) / (1 - Math.pow(1 + 0.085 / 12, -loanTerm[0])),
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#FF9500] text-white p-4 flex items-center">
        <Link href="/home">
          <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-white/10">
            <FaArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-xl">Car Details</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Image Gallery */}
        <div className="relative">
          <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-full h-64 object-cover" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs py-1 px-2 rounded">1/3</div>
        </div>

        {/* Car Info */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold">{car.title}</h2>
            <span className="font-bold text-xl text-[#FF5722]">R{car.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-1" />
            <span>{car.location}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaCalendarAlt className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Year</p>
                <p className="font-medium">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaTachometerAlt className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Mileage</p>
                <p className="font-medium">{car.mileage.toLocaleString()} km</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaGasPump className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Fuel</p>
                <p className="font-medium">{car.fuelType}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FaCog className="text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Transmission</p>
                <p className="font-medium">{car.transmission}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-2 bg-white p-4">
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <h3 className="font-medium">Description</h3>
              <p className="text-gray-600 text-sm">{car.description}</p>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Dealer Information</h3>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-[#FF9500] text-white p-2 rounded-full mr-3">{car.dealer.name.charAt(0)}</div>
                    <div>
                      <p className="font-medium">{car.dealer.name}</p>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{car.dealer.rating}</span>
                        {car.dealer.verified && (
                          <span className="ml-2 text-[#4FD1C5] flex items-center text-xs">
                            <FaCheck className="mr-1" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white">
                    <FaCommentDots className="mr-2" /> Chat
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <h3 className="font-medium mb-3">Features & Specifications</h3>
              <ul className="grid grid-cols-2 gap-2">
                {car.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-sm">
                    <FaCheck className="text-[#4FD1C5] mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="finance" className="space-y-4">
              <div className="bg-[#FF9500]/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Estimated Monthly Payment</h3>
                <p className="text-2xl font-bold text-[#FF5722]">R{monthlyPayment.toLocaleString()}/month</p>
                <p className="text-xs text-gray-500">Based on your selected terms</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Down Payment</span>
                  <span className="font-medium">R{downPayment[0].toLocaleString()}</span>
                </div>
                <Slider
                  defaultValue={[50000]}
                  max={car.price / 2}
                  step={5000}
                  onValueChange={setDownPayment}
                  className="py-4"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Loan Term</span>
                  <span className="font-medium">{loanTerm[0]} months</span>
                </div>
                <Slider defaultValue={[36]} min={12} max={72} step={12} onValueChange={setLoanTerm} className="py-4" />
              </div>

              <Button className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white">Apply for Financing</Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-xl font-bold text-[#FF5722]">R{car.price.toLocaleString()}</p>
        </div>
        <Link href={`/checkout/${car.id}`}>
          <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white px-8">Buy Now</Button>
        </Link>
      </div>
    </div>
  )
}
