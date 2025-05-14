// This file contains mock data for the blockchain explorer
// In a real application, this would be replaced with API calls to blockchain nodes

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
function generateBlock(blockNumber: number, chain = "ethereum") {
  const transactionCount = Math.floor(Math.random() * 50) + 1
  const transactions = Array.from({ length: transactionCount }, () => ({
    hash: generateHash(),
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 10).toFixed(4),
    gasPrice: (Math.random() * 100).toFixed(2),
    gasUsed: Math.floor(Math.random() * 1000000),
    timestamp: Date.now() - Math.floor(Math.random() * 3600000),
    status: Math.random() > 0.1, // 90% success rate
  }))

  return {
    number: blockNumber,
    hash: generateHash(),
    timestamp: Date.now() - blockNumber * 15000, // Approximately 15 seconds per block
    transactions,
    miner: generateAddress(),
    gasUsed: transactions.reduce((sum: number, tx: any) => sum + tx.gasUsed, 0),
    gasLimit: 15000000,
    size: Math.floor(Math.random() * 100000) + 10000,
    chain,
  }
}

// Generate a random transaction
function generateTransaction(chain = "ethereum") {
  const blockNumber = Math.floor(Math.random() * 10000000) + 1
  const hash = generateHash()
  const timestamp = Date.now() - Math.floor(Math.random() * 3600000)
  const status = Math.random() > 0.2 ? true : Math.random() > 0.5 ? false : null // null means pending

  return {
    hash,
    blockNumber: status === null ? null : blockNumber,
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 10).toFixed(4),
    gasPrice: (Math.random() * 100).toFixed(2),
    gasUsed: Math.floor(Math.random() * 1000000),
    timestamp,
    status,
    chain,
  }
}

// Generate blockchain stats
function generateStats(chain = "ethereum") {
  const baseStats = {
    blockHeight: 18500000 + Math.floor(Math.random() * 1000),
    totalTransactions: 2000000000 + Math.floor(Math.random() * 10000000),
    avgBlockTime: 12 + Math.random() * 3,
    gasPrice: Math.floor(Math.random() * 50) + 10,
    activeWallets: 1000000 + Math.floor(Math.random() * 100000),
  }

  // Customize stats based on chain
  switch (chain) {
    case "bitcoin":
      return {
        ...baseStats,
        blockHeight: 800000 + Math.floor(Math.random() * 1000),
        avgBlockTime: 600 + Math.random() * 60,
        gasPrice: 0, // Bitcoin doesn't use gas
      }
    case "polygon":
      return {
        ...baseStats,
        blockHeight: 45000000 + Math.floor(Math.random() * 10000),
        avgBlockTime: 2 + Math.random(),
      }
    case "binance":
      return {
        ...baseStats,
        blockHeight: 30000000 + Math.floor(Math.random() * 5000),
        avgBlockTime: 3 + Math.random(),
      }
    case "solana":
      return {
        ...baseStats,
        blockHeight: 200000000 + Math.floor(Math.random() * 1000000),
        avgBlockTime: 0.4 + Math.random() * 0.1,
      }
    default:
      return baseStats
  }
}

// Mock API functions
export async function getLatestBlocks(chain = "ethereum", count = 10) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startBlock =
    chain === "ethereum"
      ? 18500000
      : chain === "bitcoin"
        ? 800000
        : chain === "polygon"
          ? 45000000
          : chain === "binance"
            ? 30000000
            : 200000000

  return Array.from({ length: count }, (_, i) => generateBlock(startBlock - i, chain))
}

export async function getLatestTransactions(chain = "ethereum", count = 10) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return Array.from({ length: count }, () => generateTransaction(chain))
}

export async function getBlockchainStats(chain = "ethereum") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return generateStats(chain)
}
