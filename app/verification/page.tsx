"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FaIdCard, FaCamera } from "react-icons/fa"
import { MdVerified } from "react-icons/md"

export default function VerificationPage() {
  const [step, setStep] = useState(1)
  const [idUploaded, setIdUploaded] = useState(false)
  const [selfieUploaded, setSelfieUploaded] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/home")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FF9500] to-[#8B5A00]">
      <div className="w-full max-w-md bg-[#8B5A00]/80 rounded-3xl shadow-xl p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Identity Verification</h1>
          <p className="text-white/70">
            Step {step} of 3: {step === 1 ? "ID Verification" : step === 2 ? "Selfie Check" : "Credit Check"}
          </p>
          <Progress value={(step / 3) * 100} className="mt-4 h-2 bg-white/20" />
        </div>

        <div className="bg-[#333]/30 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-[#FF5722] p-2 rounded-full">
              {step === 1 ? (
                <FaIdCard className="h-5 w-5 text-white" />
              ) : step === 2 ? (
                <FaCamera className="h-5 w-5 text-white" />
              ) : (
                <MdVerified className="h-5 w-5 text-white" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-white">
              {step === 1 ? "Scan Your ID" : step === 2 ? "Take a Selfie" : "Credit Check"}
            </h2>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-white/80">Please scan your South African ID to verify your identity.</p>
              <div
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-[#FF5722]/70 transition-colors"
                onClick={() => setIdUploaded(true)}
              >
                {!idUploaded ? (
                  <>
                    <FaIdCard className="h-12 w-12 mx-auto text-white/50 mb-2" />
                    <p className="text-white/70">Click to scan your ID</p>
                  </>
                ) : (
                  <div className="text-[#4FD1C5] flex flex-col items-center">
                    <MdVerified className="h-12 w-12 mb-2" />
                    <p>ID successfully scanned</p>
                    <p className="text-sm text-white/70 mt-2">ID Number: ••••••••••789</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-white/80">Please take a selfie for liveness verification.</p>
              <div
                className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-[#FF5722]/70 transition-colors"
                onClick={() => setSelfieUploaded(true)}
              >
                {!selfieUploaded ? (
                  <>
                    <FaCamera className="h-12 w-12 mx-auto text-white/50 mb-2" />
                    <p className="text-white/70">Click to take a selfie</p>
                  </>
                ) : (
                  <div className="text-[#4FD1C5] flex flex-col items-center">
                    <MdVerified className="h-12 w-12 mb-2" />
                    <p>Selfie verification successful</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-white/80">We're checking your credit score with TransUnion.</p>
              <div className="bg-[#222]/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/90">Your Credit Score:</span>
                  <span className="text-xl font-bold text-[#4FD1C5]">720</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full mb-1">
                  <div
                    className="bg-gradient-to-r from-[#FF5722] to-[#4FD1C5] h-3 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <div className="mt-4 p-3 bg-[#4FD1C5]/20 border border-[#4FD1C5]/30 rounded-lg">
                  <p className="text-[#4FD1C5] font-medium">You qualify for financing up to R350,000</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !idUploaded) || (step === 2 && !selfieUploaded)}
              className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white ml-auto"
            >
              {step === 3 ? "Continue to Marketplace" : "Next"}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 mt-4">
          <div className="bg-[#4FD1C5]/20 p-1 px-2 rounded text-xs text-[#4FD1C5] font-medium">POPIA Compliant</div>
          <div className="bg-[#4FD1C5]/20 p-1 px-2 rounded text-xs text-[#4FD1C5] font-medium">Secure Encryption</div>
        </div>
      </div>
    </div>
  )
}
