"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "@/lib/utils"

// Mock data for demonstration
import { getBlocks } from "@/lib/mock-data"

interface BlockListProps {
  onBlockClick: (blockNumber: number) => void
  onTransactionClick: (txHash: string) => void
  onAddressClick: (address: string) => void
  searchQuery?: string
}

export function BlockList({ onBlockClick, onTransactionClick, onAddressClick, searchQuery }: BlockListProps) {
  const [blocks, setBlocks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call with pagination
        const data = await getBlocks(page, pageSize, searchQuery)
        setBlocks(data)
      } catch (error) {
        console.error("Failed to fetch blocks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlocks()
  }, [page, searchQuery])

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Blocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Blocks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Txn</TableHead>
                <TableHead className="hidden md:table-cell">Miner</TableHead>
                <TableHead className="text-right">Gas Used</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block) => (
                <TableRow key={block.number}>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-primary"
                      onClick={() => onBlockClick(block.number)}
                    >
                      {block.number}
                    </Button>
                  </TableCell>
                  <TableCell>{formatDistanceToNow(block.timestamp)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{block.transactions.length}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Button
                      variant="link"
                      className="p-0 h-auto font-normal"
                      onClick={() => onAddressClick(block.miner)}
                    >
                      {truncateHash(block.miner)}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">{block.gasUsed.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button variant="outline" size="sm" onClick={handleNextPage}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
