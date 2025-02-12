import { X } from "lucide-react"
import Image from "next/image"
import type { CardData } from "@/types/card"

interface CardModalProps {
  card: CardData
  onClose: () => void
}

export default function CardModal({ card, onClose }: CardModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">{card.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Image
              src={card.card_images[0].image_url || "/placeholder.svg"}
              alt={card.name}
              width={400}
              height={584}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Type:</span> {card.type}
            </p>
            <p>
              <span className="font-semibold">Race:</span> {card.race}
            </p>
            {card.attribute && (
              <p>
                <span className="font-semibold">Attribute:</span> {card.attribute}
              </p>
            )}
            {card.level && (
              <p>
                <span className="font-semibold">Level:</span> {card.level}
              </p>
            )}
            {card.atk !== undefined && (
              <p>
                <span className="font-semibold">ATK:</span> {card.atk}
              </p>
            )}
            {card.def !== undefined && (
              <p>
                <span className="font-semibold">DEF:</span> {card.def}
              </p>
            )}
            <p>
              <span className="font-semibold">Description:</span> {card.desc}
            </p>
            {card.card_sets && (
              <div>
                <h3 className="font-semibold mb-2">Card Sets:</h3>
                <ul className="list-disc pl-5">
                  {card.card_sets.map((set, index) => (
                    <li key={index}>
                      {set.set_name} ({set.set_rarity})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {card.card_prices && card.card_prices[0] && (
              <div>
                <h3 className="font-semibold mb-2">Prices:</h3>
                <ul className="list-disc pl-5">
                  <li>Cardmarket: €{card.card_prices[0].cardmarket_price}</li>
                  <li>TCGPlayer: ${card.card_prices[0].tcgplayer_price}</li>
                  <li>eBay: ${card.card_prices[0].ebay_price}</li>
                  <li>Amazon: ${card.card_prices[0].amazon_price}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

