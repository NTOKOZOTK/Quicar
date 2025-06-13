import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FF9500] text-white">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8 p-6">
        <div className="relative w-32 h-32 mb-4">
          <div className="absolute inset-0 rounded-2xl bg-black flex items-center justify-center">
            <div className="rounded-full bg-[#FF5722] w-16 h-16"></div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white drop-shadow-md">Buy Your Car 100% Online</h1>

        <p className="text-2xl font-medium text-center mb-8">Thenga Imoto Yakho Ku-inthanethi</p>

        <div className="w-full max-w-xs">
          <div className="relative w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-3/4 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="mt-16 w-full">
          <Link href="/login">
            <Button className="w-full bg-white text-[#FF9500] hover:bg-white/90 text-lg font-semibold py-6">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
