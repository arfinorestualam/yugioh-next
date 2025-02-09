export interface CardData {
  id: number
  name: string
  type: string
  atk?: number
  def?: number
  level?: number
  attribute?: string
  race?: string
  card_images: {
    image_url: string
  }[]
  [key: string]: any
}

export interface FilterOptions {
  searchTerm: string
  selectedTypes: string[]
  monsterType: string
  spellType: string
  trapType: string
  level: number | null
  attribute: string | null
}



export interface SortOption {
  field: "atk" | "def" | null
  order: "asc" | "desc"
}

