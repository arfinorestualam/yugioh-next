"use client"

import { useState, useEffect, useCallback } from "react"
import Card from "./Card"
import CardModal from "./CardModal"
import ErrorPage from "./ErrorPage"
import type { CardData, FilterOptions } from "@/types/card"

interface CardListProps {
  filterOptions: FilterOptions & { sort?: string }
}

export default function CardList({ filterOptions }: CardListProps) {
  const [cards, setCards] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const fetchCards = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      const params = new URLSearchParams()

      if (filterOptions.searchTerm) {
        params.append("fname", filterOptions.searchTerm)
      }

      if (filterOptions.selectedTypes.length > 0) {
        const type = filterOptions.selectedTypes[0]
        switch (type) {
          case "spell":
            params.append("type", "Spell Card")
            if (filterOptions.spellType) {
              params.append("race", filterOptions.spellType)
            }
            break
          case "trap":
            params.append("type", "Trap Card")
            if (filterOptions.trapType) {
              params.append("race", filterOptions.trapType)
            }
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
            if (filterOptions.level !== null) {
              params.append("level", filterOptions.level.toString())
            }
            if (filterOptions.attribute) {
              params.append("attribute", filterOptions.attribute)
            }
            // Only apply sort for monster cards
            if (filterOptions.sort) {
              params.append("sort", filterOptions.sort)
            }
            break
        }
      }

      params.append("num", "100")
      params.append("offset", "0")

      const finalUrl = `${url}?${params.toString()}`
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
      setError(`Failed to load cards: ${err instanceof Error ? err.message : JSON.stringify(err)}`)
      setCards([])
    } finally {
      setIsLoading(false)
    }
  }, [filterOptions])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
  }

  if (isLoading) return <div className="text-center mt-8 text-2xl">Loading...</div>
  if (error || cards.length === 0) {
    return (
      <ErrorPage
        isEmptyData={cards.length === 0 && !error}
        errorMessage={error || "No cards found"}
        onRetry={fetchCards}
      />
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      {selectedCard && <CardModal card={selectedCard} onClose={handleCloseModal} />}
    </>
  )
}

