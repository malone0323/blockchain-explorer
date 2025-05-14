"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BlockList } from "@/components/block-list"
import { TransactionDetails } from "@/components/transaction-details"
import { AddressInfo } from "@/components/address-info"
import { SearchBar } from "@/components/search-bar"
import { ThemeProvider } from "@/components/theme-provider"

type View = "blocks" | "transaction" | "address"

export function BlockExplorer() {
  const [view, setView] = useState<View>("blocks")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    // Simple logic to determine what type of data was searched
    if (query.startsWith("0x") && query.length === 66) {
      setView("transaction")
      setSelectedId(query)
    } else if (query.startsWith("0x") && query.length === 42) {
      setView("address")
      setSelectedId(query)
    } else if (!isNaN(Number(query))) {
      setView("blocks")
      // If it's a number, we assume it's a block number
    }
  }

  const handleBlockClick = (blockNumber: number) => {
    // When a block is clicked, we could show its details
    setView("blocks")
    setSelectedId(blockNumber.toString())
  }

  const handleTransactionClick = (txHash: string) => {
    setView("transaction")
    setSelectedId(txHash)
  }

  const handleAddressClick = (address: string) => {
    setView("address")
    setSelectedId(address)
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} />
          <div className="mt-6">
            {view === "blocks" && (
              <BlockList
                onBlockClick={handleBlockClick}
                onTransactionClick={handleTransactionClick}
                onAddressClick={handleAddressClick}
                searchQuery={searchQuery}
              />
            )}
            {view === "transaction" && selectedId && (
              <TransactionDetails txHash={selectedId} onAddressClick={handleAddressClick} />
            )}
            {view === "address" && selectedId && (
              <AddressInfo address={selectedId} onTransactionClick={handleTransactionClick} />
            )}
          </div>
        </main>
        <footer className="border-t py-6 bg-muted/40">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            Blockchain Explorer &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
