"use client"

import { useState, useEffect } from "react"
import { useApp } from "../context/AppContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPanel() {
  const { state } = useApp()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-[#FF9500] text-white p-4">
        <h1 className="font-bold text-xl">QUICAR Admin Panel</h1>
      </header>

      <main className="p-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{state.cars.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{state.cars.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inquiries Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl">🤖</div>
                  <div className="flex-1">
                    <p className="font-medium">High-Intent Buyer</p>
                    <p className="text-sm text-gray-600">Customer viewed 2022 Toyota Corolla 3 times in 2 hours</p>
                  </div>
                  <Button size="sm">Respond Now</Button>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl">📈</div>
                  <div className="flex-1">
                    <p className="font-medium">Price Adjustment Suggested</p>
                    <p className="text-sm text-gray-600">2021 VW Polo price 5% above market average</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Vehicle Inventory</CardTitle>
                <Button>Add New Vehicle</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.cars.map((car: any) => (
                    <div key={car.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={car.image || "/placeholder.svg"}
                        alt={car.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{car.title}</h4>
                        <p className="text-sm text-gray-600">R{car.price.toLocaleString()}</p>
                        <p className="text-xs text-green-600">Active</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R2,314,000</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-sm text-green-600">+3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Sale Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R289,250</div>
                  <p className="text-sm text-gray-600">Same as last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>POPIA Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Data Encryption</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Consent</span>
                  <span className="text-green-600">✓ Collected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Anonymization</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
