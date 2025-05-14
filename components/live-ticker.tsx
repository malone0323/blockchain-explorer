"use client"

import { useEffect, useRef } from "react"
import { useBlockchain } from "@/components/blockchain-provider"
import { ArrowRight } from "lucide-react"

export function LiveTicker() {
  const { blocks, transactions } = useBlockchain()
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const animation = ticker.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 30000,
      iterations: Number.POSITIVE_INFINITY,
    })

    return () => {
      animation.cancel()
    }
  }, []) // Only run the effect when the component mounts and unmounts

  // Combine and format ticker items
  const tickerItems = [
    ...blocks.slice(0, 5).map((block) => ({
      type: "block",
      id: block.number,
      text: `Block #${block.number} | ${block.transactions.length} txs`,
    })),
    ...transactions.slice(0, 5).map((tx) => ({
      type: "tx",
      id: tx.hash,
      text: `Tx: ${tx.hash.substring(0, 8)}...${tx.hash.substring(tx.hash.length - 8)} | ${tx.value} ETH`,
    })),
  ]

  // Duplicate items to create seamless loop
  const allItems = [...tickerItems, ...tickerItems]

  return (
    <div className="relative w-full overflow-hidden bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20">
      <div ref={tickerRef} className="whitespace-nowrap inline-block">
        {allItems.map((item, index) => (
          <div key={`${item.type}-${item.id}-${index}`} className="inline-block px-4 py-2">
            <span className={`inline-flex items-center ${item.type === "block" ? "text-primary" : "text-foreground"}`}>
              {item.text}
              <ArrowRight className="h-4 w-4 ml-2 opacity-50" />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
