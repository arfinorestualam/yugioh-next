"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const monsterTypes = [
  { name: "All Monster Types", value: "" },
  { name: "Normal Monster", value: "Normal Monster" },
  { name: "Normal Tuner Monster", value: "Normal Tuner Monster" },
  { name: "Effect Monster", value: "Effect Monster" },
  { name: "Tuner Monster", value: "Tuner Monster" },
  { name: "Flip Monster", value: "Flip Monster" },
  { name: "Flip Effect Monster", value: "Flip Effect Monster" },
  { name: "Spirit Monster", value: "Spirit Monster" },
  { name: "Union Effect Monster", value: "Union Effect Monster" },
  { name: "Gemini Monster", value: "Gemini Monster" },
  { name: "Pendulum Effect Monster", value: "Pendulum Effect Monster" },
  { name: "Pendulum Normal Monster", value: "Pendulum Normal Monster" },
  { name: "Pendulum Effect Ritual Monster", value: "Pendulum Effect Ritual Monster" },
  { name: "Pendulum Tuner Effect Monster", value: "Pendulum Tuner Effect Monster" },
  { name: "Ritual Monster", value: "Ritual Monster" },
  { name: "Ritual Effect Monster", value: "Ritual Effect Monster" },
  { name: "Toon Monster", value: "Toon Monster" },
  { name: "Fusion Monster", value: "Fusion Monster" },
  { name: "Synchro Monster", value: "Synchro Monster" },
  { name: "Synchro Tuner Monster", value: "Synchro Tuner Monster" },
  { name: "Synchro Pendulum Effect Monster", value: "Synchro Pendulum Effect Monster" },
  { name: "XYZ Monster", value: "XYZ Monster" },
  { name: "XYZ Pendulum Effect Monster", value: "XYZ Pendulum Effect Monster" },
  { name: "Link Monster", value: "Link Monster" },
  { name: "Pendulum Flip Effect Monster", value: "Pendulum Flip Effect Monster" },
  { name: "Pendulum Effect Fusion Monster", value: "Pendulum Effect Fusion Monster" },
  { name: "Token", value: "Token" },
]

interface MonsterTypeFilterProps {
  selectedMonsterType: string
  onMonsterTypeChange: (type: string) => void
}

export default function MonsterTypeFilter({ selectedMonsterType, onMonsterTypeChange }: MonsterTypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = monsterTypes.find((type) => type.value === selectedMonsterType)?.name || "All Monster Types"

  return (
    <div className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {monsterTypes.map((type) => (
            <li
              key={type.value}
              className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                type.value === selectedMonsterType ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
              }`}
              onClick={() => {
                onMonsterTypeChange(type.value)
                setIsOpen(false)
              }}
            >
              <span className={`block truncate ${type.value === selectedMonsterType ? "font-medium" : "font-normal"}`}>
                {type.name}
              </span>
              {type.value === selectedMonsterType && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

