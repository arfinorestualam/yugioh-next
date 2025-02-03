"use client"

import { useState, useCallback } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 300)

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value
      setSearchTerm(newSearchTerm)
      onSearchChange(newSearchTerm)
    },
    [onSearchChange],
  )

  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search for cards"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
  )
}

