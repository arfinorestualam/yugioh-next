"use client"

import { useState, useEffect } from "react"
import Card from "./Card"
import type { CardData, FilterOptions } from "@/types/card"

interface CardListProps {
  filterOptions: FilterOptions
}

export default function CardList({ filterOptions }: CardListProps) {
  const [cards, setCards] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true)
      setError(null)
      try {
        let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        const params = new URLSearchParams()

        if (filterOptions.searchTerm) {
          params.append("fname", filterOptions.searchTerm)
        }

        const monsterSubtypes = [
          "Normal Monster",
          "Effect Monster",
          "Fusion Monster",
          "Ritual Monster",
          "Synchro Monster",
          "XYZ Monster",
          "Link Monster",
        ]

        const selectedTypes = filterOptions.selectedTypes.filter(
          (type) => type === "spell" || type === "trap" || monsterSubtypes.includes(type),
        )

        if (selectedTypes.length > 0) {
          const typeParams = selectedTypes
            .map((type) => {
              switch (type) {
                case "spell":
                  return "Spell Card"
                case "trap":
                  return "Trap Card"
                default:
                  return type
              }
            })
            .join(",")

          if (typeParams) {
            params.append("type", typeParams)
          }
        }

        // Always add a limit to prevent overwhelming the API
        params.append("num", "100")
        params.append("offset", "0")

        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setCards(data.data || [])
      } catch (err) {
        console.error("Error fetching cards:", err)
        setError(`Failed to load cards: ${err instanceof Error ? err.message : "Unknown error"}`)
        setCards([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [filterOptions])

  if (isLoading) return <div className="text-center mt-8 text-2xl">Loading...</div>
  if (error) return <div className="text-center mt-8 text-2xl text-red-500">{error}</div>
  if (cards.length === 0) return <div className="text-center mt-8 text-2xl">No cards found</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

