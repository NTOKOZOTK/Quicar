"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  FaArrowLeft,
  FaCog,
  FaHeart,
  FaHistory,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaEdit,
  FaCamera,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"
import { useApp } from "../context/AppContext"

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+27 11 123 4567",
    location: "Johannesburg, South Africa",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const { state, dispatch } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate("/login")
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: "Profile updated successfully",
      },
    })
  }

  const favoritesCars = state.cars.filter((car) => state.favorites.includes(car.id))

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-500 text-white p-4 flex items-center">
        <Link to="/home">
          <button className="mr-3 text-white hover:bg-white/10 p-2 rounded-full">
            <FaArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <h1 className="font-bold text-xl">Profile</h1>
      </header>

      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={profileData.avatar || "/placeholder.svg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full">
                <FaCamera className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="ml-4 flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="text-xl font-bold border-b border-gray-300 focus:border-orange-500 outline-none bg-transparent"
              />
            ) : (
              <h2 className="text-xl font-bold">{profileData.name}</h2>
            )}
            <p className="text-gray-600">Member since 2024</p>
          </div>
          <button
            onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {isEditing ? "Save" : <FaEdit />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "profile" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "favorites" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
            }`}
          >
            Favorites ({state.favorites.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "settings" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600"
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === "profile" && (
          <div className="space-y-4">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none bg-transparent"
                    />
                  ) : (
                    <span>{profileData.location}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{state.favorites.length}</div>
                <div className="text-sm text-gray-600">Favorites</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">3</div>
                <div className="text-sm text-gray-600">Purchases</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaHeart className="text-red-500 mr-3" />
                  <div>
                    <p className="font-medium">Added Toyota Corolla to favorites</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaHistory className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">Viewed Volkswagen Polo details</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="space-y-4">
            {favoritesCars.length > 0 ? (
              favoritesCars.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="flex">
                    <img src={car.image || "/placeholder.svg"} alt={car.title} className="w-24 h-24 object-cover" />
                    <div className="flex-1 p-4">
                      <h3 className="font-bold">{car.title}</h3>
                      <p className="text-orange-600 font-bold">R{car.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{car.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Link to={`/car/${car.id}`}>
                          <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">
                            View Details
                          </button>
                        </Link>
                        <button
                          onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: car.id })}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-4">Start browsing cars and add them to your favorites</p>
                <Link to="/home">
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Browse Cars
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            {/* Settings Menu */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <FaBell className="text-gray-400 mr-3" />
                  <span>Notifications</span>
                </div>
                <button className="w-12 h-6 bg-orange-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>

              <Link to="/help">
                <div className="p-4 border-b border-gray-100 flex items-center">
                  <FaQuestionCircle className="text-gray-400 mr-3" />
                  <span>Help & Support</span>
                </div>
              </Link>

              <div className="p-4 border-b border-gray-100 flex items-center">
                <FaCog className="text-gray-400 mr-3" />
                <span>App Settings</span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full p-4 flex items-center text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* App Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">About QUICAR</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Version 1.0.0</p>
                <p>© 2024 QUICAR. All rights reserved.</p>
                <p>Powered by PrimeDrive</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
