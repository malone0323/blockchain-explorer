"use client"

import { useState } from "react"
import { useBlockchain } from "@/components/blockchain-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "@/lib/utils"
import { ArrowUpRight, CheckCircle2, Clock, XCircle, ChevronRight, ExternalLink, Blocks } from "lucide-react"

export function LatestActivity() {
  const { blocks, transactions, isLoading } = useBlockchain()
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null)
  const [expandedTx, setExpandedTx] = useState<string | null>(null)

  const toggleBlockExpand = (blockNumber: number) => {
    setExpandedBlock(expandedBlock === blockNumber ? null : blockNumber)
  }

  const toggleTxExpand = (txHash: string) => {
    setExpandedTx(expandedTx === txHash ? null : txHash)
  }

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Latest Blockchain Activity</h2>

        <Tabs defaultValue="blocks" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="blocks" className="text-lg py-3">
              Latest Blocks
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-lg py-3">
              Latest Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blocks">
            <div className="grid gap-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index} className="border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-8 w-24" />
                          <Skeleton className="h-6 w-32" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : blocks.slice(0, 5).map((block) => (
                    <Card
                      key={block.number}
                      className={`border-primary/20 transition-all duration-300 ${
                        expandedBlock === block.number ? "shadow-glow" : "hover:shadow-glow-sm"
                      }`}
                    >
                      <CardContent className="p-0">
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-6 h-auto text-left"
                          onClick={() => toggleBlockExpand(block.number)}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                              <Blocks className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">Block #{block.number}</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatDistanceToNow(block.timestamp)} ago
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {block.transactions.length} Txs
                            </Badge>
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${
                                expandedBlock === block.number ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </Button>

                        {expandedBlock === block.number && (
                          <div className="px-6 pb-6 pt-0 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Miner</p>
                                <p className="text-sm font-mono">{truncateHash(block.miner)}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Gas Used</p>
                                <p className="text-sm">
                                  {block.gasUsed.toLocaleString()} ({Math.round((block.gasUsed / block.gasLimit) * 100)}
                                  %)
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-2">Transactions</p>
                              <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                {block.transactions.slice(0, 5).map((tx: any) => (
                                  <div
                                    key={tx.hash}
                                    className="text-sm bg-background/50 p-2 rounded-md flex justify-between"
                                  >
                                    <span className="font-mono">{truncateHash(tx.hash)}</span>
                                    <span>{tx.value} ETH</span>
                                  </div>
                                ))}
                                {block.transactions.length > 5 && (
                                  <Button variant="ghost" size="sm" className="w-full mt-2">
                                    View all {block.transactions.length} transactions
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" className="gap-1">
                                View Block Details
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="gap-1 text-foreground hover:text-foreground">
                  View All Blocks
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="grid gap-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index} className="border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-8 w-36" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : transactions.slice(0, 5).map((tx) => (
                    <Card
                      key={tx.hash}
                      className={`border-primary/20 transition-all duration-300 ${
                        expandedTx === tx.hash ? "shadow-glow" : "hover:shadow-glow-sm"
                      }`}
                    >
                      <CardContent className="p-0">
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-6 h-auto text-left"
                          onClick={() => toggleTxExpand(tx.hash)}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                              <ArrowUpRight className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-mono font-medium">{truncateHash(tx.hash)}</h3>
                              <p className="text-sm text-muted-foreground">{formatDistanceToNow(tx.timestamp)} ago</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {tx.status ? (
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 text-green-500 border-green-500/20 mr-2"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Success
                              </Badge>
                            ) : tx.status === false ? (
                              <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 mr-2">
                                <XCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 mr-2"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${expandedTx === tx.hash ? "rotate-90" : ""}`}
                            />
                          </div>
                        </Button>

                        {expandedTx === tx.hash && (
                          <div className="px-6 pb-6 pt-0 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">From</p>
                                <p className="text-sm font-mono">{truncateHash(tx.from)}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">To</p>
                                <p className="text-sm font-mono">{truncateHash(tx.to)}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Value</p>
                                <p className="text-sm">{tx.value} ETH</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Gas Price</p>
                                <p className="text-sm">{tx.gasPrice} Gwei</p>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" className="gap-1">
                                View Transaction Details
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="gap-1 text-foreground hover:text-foreground">
                  View All Transactions
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
