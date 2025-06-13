"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaTwitter, FaFacebook, FaGoogle } from "react-icons/fa"
import { useApp } from "../context/AppContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { dispatch } = useApp()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      dispatch({
        type: "SET_USER",
        payload: { email, name: "John Doe" },
      })
      setLoading(false)
      router.push("/verification")
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FF9500] to-[#8B5A00]">
      <div className="w-full max-w-md bg-[#8B5A00]/80 rounded-3xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 rounded-2xl bg-black flex items-center justify-center">
              <div className="rounded-full bg-[#FF5722] w-12 h-12"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">QUICAR</h1>
          <p className="text-white/70 text-sm">Powered by Primedrive</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#333] text-white border-none"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#333] text-white border-none"
            required
          />
          <div className="text-right">
            <Link href="/forgot-password" className="text-[#4FD1C5] text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF5722] hover:bg-[#FF5722]/90 text-white font-semibold py-5"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#8B5A00] text-white/60">or sign in using</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <FaTwitter className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <FaFacebook className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <FaGoogle className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-white/70 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#4FD1C5] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
