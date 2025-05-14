"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBlockchain } from "@/components/blockchain-provider"
import { Search } from "lucide-react"
import { LiveTicker } from "@/components/live-ticker"

interface HeroSectionProps {
  onSearch: (query: string) => void
}

const texts = [
  "Explore Blockchain Transactions in Real-Time",
  "Track Blocks, Addresses & Smart Contracts",
  "The Most Advanced Blockchain Explorer",
]

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const { stats } = useBlockchain()

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        if (charIndex < texts[textIndex].length) {
          setDisplayText((prev) => prev + texts[textIndex][charIndex])
          setCharIndex((prev) => prev + 1)
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setIsTyping(true)
            setCharIndex(0)
            setDisplayText("")
            setTextIndex((prev) => (prev + 1) % texts.length)
          }, 2000) // Wait for 2 seconds before starting the next text
        }
      }
    }, 50) // Adjust typing speed here

    return () => clearInterval(typingInterval)
  }, [charIndex, isTyping, textIndex])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
        <div className="blockchain-nodes" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Blockchain Explorer
          </h1>

          <div className="h-16 flex items-center justify-center mb-8">
            <h2 className="text-xl md:text-2xl font-medium text-foreground">
              {displayText}
              <span className="typing-cursor">|</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-12">
            <Input
              type="text"
              placeholder="Search by Transaction Hash, Block, Address…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-5 pr-14 text-lg rounded-full border-primary/30 bg-background/70 backdrop-blur-sm focus-visible:ring-primary/50 shadow-glow"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 h-16 overflow-hidden">
            <LiveTicker />
          </div>
        </div>
      </div>
    </section>
  )
}
