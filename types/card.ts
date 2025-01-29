export interface CardData {
  id: number
  name: string
  type: string
  atk?: number
  def?: number
  card_images: {
    image_url: string
  }[]
  [key: string]: any // This allows us to use string indexing for sorting
}

export interface SortOption {
  field: "atk" | "def" | null
  order: "asc" | "desc"
}

