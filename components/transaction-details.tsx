"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "@/lib/utils"

// Mock data for demonstration
import { getTransaction } from "@/lib/mock-data"

interface TransactionDetailsProps {
  txHash: string
  onAddressClick: (address: string) => void
}

export function TransactionDetails({ txHash, onAddressClick }: TransactionDetailsProps) {
  const [transaction, setTransaction] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        const data = await getTransaction(txHash)
        setTransaction(data)
      } catch (error) {
        console.error("Failed to fetch transaction:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [txHash])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!transaction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4 text-muted-foreground">Transaction not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Transaction Hash</h3>
              <p className="text-sm break-all">{txHash}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <Badge variant={transaction.status ? "success" : "destructive"}>
                {transaction.status ? "Success" : "Failed"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Block</h3>
              <p className="text-sm">{transaction.blockNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">From</h3>
              <Button
                variant="link"
                className="p-0 h-auto text-sm break-all"
                onClick={() => onAddressClick(transaction.from)}
              >
                {transaction.from}
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">To</h3>
              <Button
                variant="link"
                className="p-0 h-auto text-sm break-all"
                onClick={() => onAddressClick(transaction.to)}
              >
                {transaction.to}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Value</h3>
              <p className="text-sm">{transaction.value} ETH</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Gas Price</h3>
              <p className="text-sm">{transaction.gasPrice} Gwei</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Gas Used</h3>
              <p className="text-sm">{transaction.gasUsed.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
            <p className="text-sm">
              {new Date(transaction.timestamp).toLocaleString()}({formatDistanceToNow(transaction.timestamp)} ago)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
