"use client"

import { useBlockchain } from "@/components/blockchain-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Blocks, ArrowUpRight, Clock, Wallet, BarChart3 } from "lucide-react"

export function BlockchainStats() {
  const { stats, isLoading } = useBlockchain()

  const statCards = [
    {
      title: "Current Block Height",
      value: stats.blockHeight?.toLocaleString() || "0",
      icon: <Blocks className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions?.toLocaleString() || "0",
      icon: <ArrowUpRight className="h-5 w-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Average Block Time",
      value: stats.avgBlockTime ? `${stats.avgBlockTime.toFixed(2)}s` : "0s",
      icon: <Clock className="h-5 w-5" />,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Gas Price",
      value: stats.gasPrice ? `${stats.gasPrice} Gwei` : "0 Gwei",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Active Wallets",
      value: stats.activeWallets?.toLocaleString() || "0",
      icon: <Wallet className="h-5 w-5" />,
      color: "from-amber-500 to-orange-600",
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Real-Time Blockchain Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <Card
              key={index}
              className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>{stat.icon}</div>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:animate-ping" />
                  </div>
                </div>

                <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>

                {isLoading ? <Skeleton className="h-8 w-24" /> : <p className="text-2xl font-bold">{stat.value}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
