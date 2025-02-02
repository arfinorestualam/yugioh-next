"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const cardTypes = [
  { name: "Monster", value: "monster" },
  { name: "Spell", value: "spell" },
  { name: "Trap", value: "trap" },
]

const monsterSubtypes = [
  "Normal Monster",
  "Effect Monster",
  "Fusion Monster",
  "Ritual Monster",
  "Synchro Monster",
  "XYZ Monster",
  "Link Monster",
]

interface TypeFilterProps {
  onTypeChange: (selectedTypes: string[]) => void
}

export default function TypeFilter({ onTypeChange }: TypeFilterProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [showMonsterSubtypes, setShowMonsterSubtypes] = useState(false)

  const handleTypeChange = (type: string) => {
    let newSelectedTypes: string[]

    if (type === "monster") {
      if (selectedTypes.includes("monster")) {
        newSelectedTypes = selectedTypes.filter((t) => t !== "monster" && !monsterSubtypes.includes(t))
        setShowMonsterSubtypes(false)
      } else {
        newSelectedTypes = [...selectedTypes.filter((t) => t !== "spell" && t !== "trap"), "monster"]
        setShowMonsterSubtypes(true)
      }
    } else if (monsterSubtypes.includes(type)) {
      if (selectedTypes.includes(type)) {
        newSelectedTypes = selectedTypes.filter((t) => t !== type)
      } else {
        newSelectedTypes = [...selectedTypes.filter((t) => t !== "monster" && !monsterSubtypes.includes(t)), type]
      }
    } else {
      if (selectedTypes.includes(type)) {
        newSelectedTypes = selectedTypes.filter((t) => t !== type)
      } else {
        newSelectedTypes = [...selectedTypes.filter((t) => t !== "monster" && !monsterSubtypes.includes(t)), type]
      }
    }

    setSelectedTypes(newSelectedTypes)
    onTypeChange(newSelectedTypes)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter by Type ({selectedTypes.length})
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {cardTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={
                    selectedTypes.includes(type.value) ||
                    (type.value === "monster" && selectedTypes.some((t) => monsterSubtypes.includes(t)))
                  }
                  onChange={() => handleTypeChange(type.value)}
                />
                <span className="ml-2">{type.name}</span>
              </label>
            ))}
            {showMonsterSubtypes && (
              <div className="pl-6">
                {monsterSubtypes.map((subtype) => (
                  <label
                    key={subtype}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={selectedTypes.includes(subtype)}
                      onChange={() => handleTypeChange(subtype)}
                    />
                    <span className="ml-2">{subtype}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

