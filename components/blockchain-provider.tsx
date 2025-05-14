"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { getLatestBlocks, getLatestTransactions, getBlockchainStats } from "@/lib/blockchain-data"

type BlockchainContextType = {
  blocks: any[]
  transactions: any[]
  stats: any
  isLoading: boolean
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [blocksData, transactionsData, statsData] = await Promise.all([
          getLatestBlocks(),
          getLatestTransactions(),
          getBlockchainStats(),
        ])

        setBlocks(blocksData)
        setTransactions(transactionsData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch blockchain data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <BlockchainContext.Provider
      value={{
        blocks,
        transactions,
        stats,
        isLoading,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  )
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)

  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }

  return context
}
