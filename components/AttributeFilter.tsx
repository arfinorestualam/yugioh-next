"use client"

const attributes = [
  { name: "LIGHT", color: "bg-yellow-400" },
  { name: "DARK", color: "bg-purple-900" },
  { name: "WATER", color: "bg-blue-500" },
  { name: "FIRE", color: "bg-red-500" },
  { name: "EARTH", color: "bg-amber-700" },
  { name: "WIND", color: "bg-green-500" },
  { name: "DIVINE", color: "bg-yellow-600" },
]

interface AttributeFilterProps {
  onAttributeChange: (attribute: string | null) => void
  selectedAttribute: string | null
}

export default function AttributeFilter({ onAttributeChange, selectedAttribute }: AttributeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attr) => (
        <button
          key={attr.name}
          onClick={() => onAttributeChange(selectedAttribute === attr.name ? null : attr.name)}
          className={`px-3 py-1 rounded-full text-sm font-medium text-white transition-all
            ${attr.color} 
            ${selectedAttribute === attr.name ? "ring-2 ring-offset-2 ring-indigo-500" : "opacity-75 hover:opacity-100"}
          `}
        >
          {attr.name}
        </button>
      ))}
    </div>
  )
}

