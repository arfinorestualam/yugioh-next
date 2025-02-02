export interface CardData {
  id: number
  name: string
  type: string
  atk?: number
  def?: number
  card_images: {
    image_url: string
  }[]
  [key: string]: any
}

export interface FilterOptions {
  searchTerm: string
  selectedTypes: string[]
}

export interface SortOption {
  field: "atk" | "def" | null
  order: "asc" | "desc"
}

