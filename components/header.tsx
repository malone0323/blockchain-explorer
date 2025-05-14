"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Search, Menu, X } from "lucide-react"

interface HeaderProps {
  onSearch: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-1 bg-primary rounded-full"></div>
                <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="font-bold text-xl">BlockVision</span>
            </Link>

            <nav className="hidden md:flex ml-10 space-x-6">
              <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/blocks" className="text-foreground/80 hover:text-foreground transition-colors">
                Blocks
              </Link>
              <Link href="/transactions" className="text-foreground/80 hover:text-foreground transition-colors">
                Transactions
              </Link>
              <Link href="/tokens" className="text-foreground/80 hover:text-foreground transition-colors">
                Tokens
              </Link>
              <Link href="/analytics" className="text-foreground/80 hover:text-foreground transition-colors">
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative w-64">
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Search by Tx, Address, Block..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-2 text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-background/50 border border-primary/20"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-foreground" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSubmit} className="flex">
              <Input
                type="text"
                placeholder="Search by Tx, Address, Block..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="ml-2">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>

            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blocks"
                className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blocks
              </Link>
              <Link
                href="/transactions"
                className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Transactions
              </Link>
              <Link
                href="/tokens"
                className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tokens
              </Link>
              <Link
                href="/analytics"
                className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
