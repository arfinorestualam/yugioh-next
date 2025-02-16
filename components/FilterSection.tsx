"use client"

import { useState, useEffect } from "react"
import TypeFilter from "./TypeFilter"
import AttributeFilter from "./AttributeFilter"
import LevelFilter from "./LevelFilter"
import MonsterTypeFilter from "./MonsterTypeFilter"
import SpellFilter from "./SpellFilter"
import TrapFilter from "./TrapFilter"
import SearchBar from "./SearchBar"
import SortFilter from "./SortFilter"
import type { FilterOptions } from "@/types/card"

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    selectedTypes: [],
    monsterType: "",
    spellType: "",
    trapType: "",
    level: null,
    attribute: null,
    sort: "",
  })

  const handleSearchChange = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }))
  }

  const handleTypeChange = (selectedType: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTypes: selectedType ? [selectedType] : [],
      // Reset type-specific filters when changing main type
      monsterType: "",
      spellType: "",
      trapType: "",
      level: null,
      attribute: null,
      sort: "",
    }))
  }

  const handleMonsterTypeChange = (monsterType: string) => {
    setFilters((prev) => ({ ...prev, monsterType }))
  }

  const handleSpellTypeChange = (spellType: string) => {
    setFilters((prev) => ({ ...prev, spellType }))
  }

  const handleTrapTypeChange = (trapType: string) => {
    setFilters((prev) => ({ ...prev, trapType }))
  }

  const handleAttributeChange = (attribute: string | null) => {
    setFilters((prev) => ({ ...prev, attribute }))
  }

  const handleLevelChange = (level: number | null) => {
    setFilters((prev) => ({ ...prev, level }))
  }

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort: sort || "" }))

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const showMonsterFilters = filters.selectedTypes.includes("monster")
  const showSpellFilters = filters.selectedTypes.includes("spell")
  const showTrapFilters = filters.selectedTypes.includes("trap")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div className="w-full md:w-64">
          <TypeFilter selectedType={filters.selectedTypes[0] || ""} onTypeChange={handleTypeChange} />
        </div>
      </div>

      {showMonsterFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Monster Type</h3>
            <MonsterTypeFilter
              onMonsterTypeChange={handleMonsterTypeChange}
              selectedMonsterType={filters.monsterType}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Attribute</h3>
            <AttributeFilter onAttributeChange={handleAttributeChange} selectedAttribute={filters.attribute} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Level</h3>
            <LevelFilter onLevelChange={handleLevelChange} selectedLevel={filters.level} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort</h3>
            <SortFilter selectedSort={filters.sort || ""} onSortChange={handleSortChange} cardType="monster" />
          </div>
        </div>
      )}

      {showSpellFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Spell Card Type</h3>
            <SpellFilter onSpellTypeChange={handleSpellTypeChange} selectedSpellType={filters.spellType} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort</h3>
            <SortFilter selectedSort={filters.sort || ""} onSortChange={handleSortChange} cardType="spell" />
          </div>
        </div>
      )}

      {showTrapFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Trap Card Type</h3>
            <TrapFilter onTrapTypeChange={handleTrapTypeChange} selectedTrapType={filters.trapType} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort</h3>
            <SortFilter selectedSort={filters.sort || ""} onSortChange={handleSortChange} cardType="trap" />
          </div>
        </div>
      )}
    </div>
  )
}

