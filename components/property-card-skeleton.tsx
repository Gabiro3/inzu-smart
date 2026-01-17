"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function PropertyCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg animate-pulse">
      <div className="aspect-[4/3] bg-gray-200"></div>
    </div>
  )
}

export function SplashScreen() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Start the animation after mount
    const timer = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Left panel */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-black transform transition-transform duration-[1500ms] ease-in-out ${
          animate ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Right panel */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 bg-black transform transition-transform duration-[1500ms] ease-in-out ${
          animate ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Logo and loading */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 transition-opacity duration-700 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {/* Vibrating Logo */}
        <div className="bg-white p-4 rounded-md">
          <Image
            src="/logo.png"
            alt="Inzu Smart Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Loading indicator */}
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce-delay1"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce-delay2"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce-delay3"></span>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .animate-vibrate {
          animation: vibrate 0.3s linear infinite;
        }

        @keyframes bounceDelay {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-delay1 {
          animation: bounceDelay 1.5s infinite;
        }
        .animate-bounce-delay2 {
          animation: bounceDelay 1.5s infinite 0.3s;
        }
        .animate-bounce-delay3 {
          animation: bounceDelay 1.5s infinite 0.5s;
        }
      `}</style>
    </div>
  )
}
