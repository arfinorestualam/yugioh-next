"use client"
import { Star } from "lucide-react"

interface LevelFilterProps {
  onLevelChange: (level: number | null) => void
  selectedLevel: number | null
}

export default function LevelFilter({ onLevelChange, selectedLevel }: LevelFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 13 }, (_, i) => (
        <button
          key={i}
          onClick={() => onLevelChange(selectedLevel === i ? null : i)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${
              selectedLevel === i
                ? "bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-500"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }
          `}
        >
          <Star className="w-4 h-4 mr-1" />
          {i}
        </button>
      ))}
    </div>
  )
}

