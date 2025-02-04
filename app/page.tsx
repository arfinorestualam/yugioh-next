"use client"

import { useState } from "react"
import CardList from "@/components/CardList"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchBar from "@/components/SearchBar"
import TypeFilter from "@/components/TypeFilter"
import type { FilterOptions } from "@/types/card"
import { useDebounce } from "@/hooks/useDebounce"

export default function Home() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: "",
    selectedTypes: [],
  })

  const handleSearchChange = (searchTerm: string) => {
    setFilterOptions((prev) => ({ ...prev, searchTerm }))
  }

  const debouncedSearchTerm = useDebounce(filterOptions.searchTerm, 300)

  const handleTypeChange = (selectedTypes: string[]) => {
    setFilterOptions((prev) => ({ ...prev, selectedTypes }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 sticky top-0 bg-indigo-50 z-10 py-4">
          <SearchBar onSearchChange={handleSearchChange} />
          <TypeFilter onTypeChange={handleTypeChange} />
        </div>
        <CardList filterOptions={{ ...filterOptions, searchTerm: debouncedSearchTerm }} />
      </main>
      <Footer />
    </div>
  )
}

