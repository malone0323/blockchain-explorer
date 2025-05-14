"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BlockchainStats } from "@/components/blockchain-stats"
import { LatestActivity } from "@/components/latest-activity"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { BlockchainProvider } from "@/components/blockchain-provider"

export function BlockchainExplorer() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would trigger a search and navigate to results
    console.log("Searching for:", query)
  }

  return (
    <ThemeProvider>
      <BlockchainProvider>
        <div className="flex min-h-screen flex-col bg-background transition-colors duration-300 no-horizontal-scroll">
          <Header onSearch={handleSearch} />
          <main className="flex-1">
            <HeroSection onSearch={handleSearch} />
            <BlockchainStats />
            <LatestActivity />
          </main>
          <Footer />
        </div>
      </BlockchainProvider>
    </ThemeProvider>
  )
}
