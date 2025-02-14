export interface CardData {
  id: number
  name: string
  type: string
  frameType: string
  desc: string
  atk?: number
  def?: number
  level?: number
  race: string
  attribute?: string
  card_sets?: {
    set_name: string
    set_code: string
    set_rarity: string
    set_rarity_code: string
    set_price: string
  }[]
  card_images: {
    id: number
    image_url: string
    image_url_small: string
    image_url_cropped: string
  }[]
  card_prices?: {
    cardmarket_price: string
    tcgplayer_price: string
    ebay_price: string
    amazon_price: string
    coolstuffinc_price: string
  }[]
}

export interface FilterOptions {
  searchTerm: string
  selectedTypes: string[]
  monsterType: string
  spellType: string
  trapType: string
  level: number | null
  attribute: string | null
  sort?: string
}

