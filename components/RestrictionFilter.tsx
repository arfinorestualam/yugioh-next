"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const restrictionOptions = [
  { name: "No Restriction", value: "" },
  { name: "Forbidden", value: "forbidden" },
  { name: "Limited", value: "limited" },
  { name: "Semi-Limited", value: "semi-limited" },
]

interface RestrictionFilterProps {
  selectedRestriction: string
  onRestrictionChange: (restriction: string) => void
}

export default function RestrictionFilter({ selectedRestriction, onRestrictionChange }: RestrictionFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = restrictionOptions.find((option) => option.value === selectedRestriction)?.name || "All Cards"

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
          {restrictionOptions.map((option) => (
            <li
              key={option.value}
              className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                option.value === selectedRestriction ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
              }`}
              onClick={() => {
                onRestrictionChange(option.value)
                setIsOpen(false)
              }}
            >
              <span
                className={`block truncate ${option.value === selectedRestriction ? "font-medium" : "font-normal"}`}
              >
                {option.name}
              </span>
              {option.value === selectedRestriction && (
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

