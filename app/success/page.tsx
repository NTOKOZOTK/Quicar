"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaCheckCircle, FaCar, FaFileAlt, FaPhone } from "react-icons/fa"

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#FF9500] text-white p-4 flex justify-center">
        <h1 className="font-bold text-xl">Purchase Complete</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md text-center">
          <div className="text-[#4FD1C5] mb-4">
            <FaCheckCircle className="h-16 w-16 mx-auto" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-6">Your car purchase has been successfully completed.</p>

          <div className="bg-[#4FD1C5]/10 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">2022 Toyota Corolla</h3>
            <p className="text-[#FF5722] font-bold">R289,000</p>
            <p className="text-sm text-gray-500 mt-1">Order #QC78945612</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <div className="bg-[#FF9500]/20 p-2 rounded-full mr-3">
                <FaCar className="h-5 w-5 text-[#FF9500]" />
              </div>
              <div className="text-left">
                <p className="font-medium">Delivery Scheduled</p>
                <p className="text-sm text-gray-500">Estimated: 14 June 2025</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-[#FF9500]/20 p-2 rounded-full mr-3">
                <FaFileAlt className="h-5 w-5 text-[#FF9500]" />
              </div>
              <div className="text-left">
                <p className="font-medium">Documents</p>
                <p className="text-sm text-gray-500">Sent to your email</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-[#FF9500]/20 p-2 rounded-full mr-3">
                <FaPhone className="h-5 w-5 text-[#FF9500]" />
              </div>
              <div className="text-left">
                <p className="font-medium">Support</p>
                <p className="text-sm text-gray-500">0800 QUICAR (784227)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/home">
              <Button className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white">Back to Home</Button>
            </Link>
            <Link href="/track-order">
              <Button variant="outline" className="w-full border-[#FF5722] text-[#FF5722]">
                Track Your Delivery
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
