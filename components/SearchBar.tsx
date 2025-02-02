"use client"

import { ChangeEvent } from 'react'

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleChange}
      className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

