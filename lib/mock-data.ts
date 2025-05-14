// This file contains mock data for the blockchain explorer
// In a real application, this would be replaced with API calls to a blockchain node

// Generate a random hash
function generateHash(length = 64): string {
  const characters = "0123456789abcdef"
  let result = "0x"
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Generate a random address
function generateAddress(): string {
  return generateHash(40)
}

// Generate a random block
function generateBlock(blockNumber: number) {
  const transactions = Array.from({ length: Math.floor(Math.random() * 50) + 1 }, () => ({
    hash: generateHash(),
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 10).toFixed(4),
    gasPrice: (Math.random() * 100).toFixed(2),
    gasUsed: Math.floor(Math.random() * 1000000),
  }))

  return {
    number: blockNumber,
    hash: generateHash(),
    timestamp: Date.now() - blockNumber * 15000, // Approximately 15 seconds per block
    transactions,
    miner: generateAddress(),
    gasUsed: transactions.reduce((sum, tx) => sum + tx.gasUsed, 0),
    gasLimit: 15000000,
    size: Math.floor(Math.random() * 100000) + 10000,
  }
}

// Generate a random transaction
function generateTransaction(txHash: string) {
  const blockNumber = Math.floor(Math.random() * 10000000) + 1

  return {
    hash: txHash,
    blockNumber,
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 10).toFixed(4),
    gasPrice: (Math.random() * 100).toFixed(2),
    gasUsed: Math.floor(Math.random() * 1000000),
    timestamp: Date.now() - Math.floor(Math.random() * 10000000),
    status: Math.random() > 0.1, // 90% success rate
  }
}

// Generate address info
function generateAddressInfo(address: string) {
  return {
    address,
    balance: (Math.random() * 100).toFixed(4),
    transactionCount: Math.floor(Math.random() * 1000),
    lastActivity: Date.now() - Math.floor(Math.random() * 10000000),
  }
}

// Generate transactions for an address
function generateAddressTransactions(address: string, count = 10) {
  return Array.from({ length: count }, (_, i) => {
    const isOutgoing = Math.random() > 0.5

    return {
      hash: generateHash(),
      blockNumber: Math.floor(Math.random() * 10000000) + 1,
      timestamp: Date.now() - Math.floor(Math.random() * 10000000),
      from: isOutgoing ? address : generateAddress(),
      to: isOutgoing ? generateAddress() : address,
      value: (Math.random() * 5).toFixed(4),
    }
  }).sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp descending
}

// Mock API functions
export async function getBlocks(page = 1, pageSize = 10, searchQuery?: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startBlock = 10000000 - (page - 1) * pageSize

  // If there's a search query and it's a number, filter to that specific block
  if (searchQuery && !isNaN(Number(searchQuery))) {
    const blockNumber = Number.parseInt(searchQuery)
    return [generateBlock(blockNumber)]
  }

  return Array.from({ length: pageSize }, (_, i) => generateBlock(startBlock - i))
}

export async function getTransaction(txHash: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return generateTransaction(txHash)
}

export async function getAddressInfo(address: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return generateAddressInfo(address)
}

export async function getAddressTransactions(address: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return generateAddressTransactions(address)
}
