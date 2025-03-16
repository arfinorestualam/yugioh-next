"use client"

import { useState, useCallback } from "react"
import CardList from "@/components/CardList"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FilterSection from "@/components/FilterSection"
import type { FilterOptions } from "@/types/card"

export default function Home() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: "",
    selectedTypes: [],
    monsterType: "",
    spellType: "",
    trapType: "",
    level: null,
    attribute: null,
    sort: "",
    banlist: "",
    restriction: "",
  })

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilterOptions(newFilters)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <FilterSection onFilterChange={handleFilterChange} />
        <div className="mt-6">
          <CardList filterOptions={filterOptions} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

