"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "@/lib/utils"

// Mock data for demonstration
import { getAddressInfo, getAddressTransactions } from "@/lib/mock-data"

interface AddressInfoProps {
  address: string
  onTransactionClick: (txHash: string) => void
}

export function AddressInfo({ address, onTransactionClick }: AddressInfoProps) {
  const [addressInfo, setAddressInfo] = useState<any | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAddressInfo = async () => {
      setLoading(true)
      try {
        // In a real app, these would be API calls
        const info = await getAddressInfo(address)
        const txs = await getAddressTransactions(address)

        setAddressInfo(info)
        setTransactions(txs)
      } catch (error) {
        console.error("Failed to fetch address info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAddressInfo()
  }, [address])

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
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

  if (!addressInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4 text-muted-foreground">Address not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <p className="text-sm break-all">{address}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
                <p className="text-sm">{addressInfo.balance} ETH</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Transactions</h3>
                <p className="text-sm">{addressInfo.transactionCount}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Last Activity</h3>
                <p className="text-sm">{formatDistanceToNow(addressInfo.lastActivity)} ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tx Hash</TableHead>
                  <TableHead>Block</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>From/To</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.hash}>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary"
                        onClick={() => onTransactionClick(tx.hash)}
                      >
                        {truncateHash(tx.hash)}
                      </Button>
                    </TableCell>
                    <TableCell>{tx.blockNumber}</TableCell>
                    <TableCell>{formatDistanceToNow(tx.timestamp)}</TableCell>
                    <TableCell>
                      {tx.from === address ? (
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">OUT</span>
                          <span className="truncate max-w-[100px]">{truncateHash(tx.to)}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">IN</span>
                          <span className="truncate max-w-[100px]">{truncateHash(tx.from)}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{tx.value} ETH</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
