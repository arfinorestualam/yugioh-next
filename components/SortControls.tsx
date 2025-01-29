"use client"

import { useState } from "react"
import type { SortOption } from "@/types/card"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import type React from "react" // Added import for React

interface SortControlsProps {
  onSortChange: (sortOption: SortOption) => void
}

export default function SortControls({ onSortChange }: SortControlsProps) {
  const [sortOption, setSortOption] = useState<SortOption>({ field: null, order: "asc" })

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split("-")
    const newSortOption = { field: field as "atk" | "def" | null, order: order as "asc" | "desc" }
    setSortOption(newSortOption)
    onSortChange(newSortOption)
  }

  return (
    <div className="flex justify-center">
      <div className="relative inline-block w-64">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={handleSortChange}
          value={`${sortOption.field}-${sortOption.order}`}
          aria-label="Sort cards"
        >
          <option value="null-asc">Sort by...</option>
          <option value="atk-asc">Attack Points: Low to High</option>
          <option value="atk-desc">Attack Points: High to Low</option>
          <option value="def-asc">Defense Points: Low to High</option>
          <option value="def-desc">Defense Points: High to Low</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

