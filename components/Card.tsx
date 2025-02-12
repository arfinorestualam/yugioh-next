import Image from "next/image"
import type { CardData } from "@/types/card"

interface CardProps {
  card: CardData
  onClick: (card: CardData) => void
}

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      className="bg-gray-100 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={() => onClick(card)}
    >
      <div className="relative w-full pt-[146%]">
        <Image
          src={card.card_images[0].image_url || "/placeholder.svg"}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-2 truncate" title={card.name}>
          {card.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">Type: {card.type}</p>
        {card.atk !== undefined && card.def !== undefined && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">ATK:</span> {card.atk} / <span className="font-medium">DEF:</span> {card.def}
          </p>
        )}
      </div>
    </div>
  )
}

