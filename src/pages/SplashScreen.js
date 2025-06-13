"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login")
    }, 6000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
<div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center text-black relative overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 township-pattern opacity-10"></div>

      {/* South African Flag Colors Accent */}
      <div className="absolute top-0 left-0 w-full h-2 sa-flag-colors"></div>

      <div className="text-center max-w-sm mx-auto px-6 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-black/20 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl font-bold mb-3 drop-shadow-lg">Buy Your Car 100% Online</h1>

        {/* Zulu Translation */}
        <p className="text-xl mb-2 opacity-90">Thenga Imoto Yakho Ku-inthanethi</p>

        {/* Tagline */}
        <p className="text-sm opacity-75 mb-8">Powered by PrimeDrive • Trusted in South Africa</p>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto mb-8">
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full animate-pulse"
              style={{
                width: "75%",
                animation: "progress 2s ease-in-out",
              }}
            ></div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex justify-center space-x-4 text-xs">
          <div className="popia-badge">POPIA Compliant</div>
          <div className="popia-badge">Secure Encryption</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 75%; }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
