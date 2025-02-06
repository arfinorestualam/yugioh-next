"use client"

import { useState, useEffect, useCallback } from "react"
import Card from "./Card"
import ErrorPage from "./ErrorPage"
import type { CardData, FilterOptions } from "@/types/card"

interface CardListProps {
  filterOptions: FilterOptions
}

export default function CardList({ filterOptions }: CardListProps) {
  const [cards, setCards] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCards = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      const params = new URLSearchParams()

      if (filterOptions.searchTerm) {
        params.append("fname", filterOptions.searchTerm)
      }

      if (filterOptions.selectedTypes.length > 0) {
        const type = filterOptions.selectedTypes[0]
        switch (type) {
          case "spell":
            url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card"
            break
          case "trap":
            url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=trap%20card"
            break
          case "monster":
            if (filterOptions.monsterType) {
              params.append("type", filterOptions.monsterType)
            } else {
              params.append(
                "type",
                "Effect Monster,Fusion Monster,Synchro Monster,XYZ Monster,Link Monster,Normal Monster,Ritual Monster",
              )
            }
            break
        }
      }

      if (filterOptions.level !== null) {
        params.append("level", filterOptions.level.toString())
      }

      if (filterOptions.attribute) {
        params.append("attribute", filterOptions.attribute)
      }

      if (!url.includes("?")) {
        params.append("num", "100")
        params.append("offset", "0")
      }

      const finalUrl = url.includes("?") ? url : `${url}?${params.toString()}`
      console.log("Fetching cards from:", finalUrl)

      const response = await fetch(finalUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!Array.isArray(data.data)) {
        throw new Error("Unexpected API response format")
      }

      setCards(data.data)
    } catch (err) {
      console.error("Error fetching cards:", err)
      setError(`Failed to load cards: ${err instanceof Error ? err.message : "Unknown error"}`)
      setCards([])
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  if (isLoading) return <div className="text-center mt-8 text-2xl">Loading...</div>
  if (error || cards.length === 0) {
    return (
      <ErrorPage isEmptyData={cards.length === 0 && !error} errorMessage={error || undefined} onRetry={fetchCards} />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

