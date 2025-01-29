"use client"

import { useState, useEffect } from "react"
import Card from "./Card"
import type { CardData, SortOption } from "@/types/card"

export default function CardList() {
  const [cards, setCards] = useState<CardData[]>([])
  const [sortOption, setSortOption] = useState<SortOption>({ field: null, order: "asc" })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        if (!response.ok) {
          throw new Error("Failed to fetch cards")
        }
        const data = await response.json()
        setCards(data.data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load cards. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [])

  useEffect(() => {
    if (sortOption.field) {
      const sortedCards = [...cards].sort((a, b) => {
        if (a[sortOption.field] === undefined || b[sortOption.field] === undefined) {
          return 0
        }
        return sortOption.order === "asc"
          ? (a[sortOption.field] as number) - (b[sortOption.field] as number)
          : (b[sortOption.field] as number) - (a[sortOption.field] as number)
      })
      setCards(sortedCards)
    }
  }, [sortOption, cards])

  if (isLoading) return <div className="text-center mt-8 text-2xl">Loading...</div>
  if (error) return <div className="text-center mt-8 text-2xl text-red-500">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  )
}

