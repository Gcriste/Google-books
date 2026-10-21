export type VolumeInfo = {
  title: string
  subtitle?: string
  description?: string
  infoLink: string
  imageLinks: {
    thumbnail: string
    title: string
  }
  authors?: string[]
  categories: string[]
  publisher: string
  publishedDate: string
}

export type SaleInfo = {
  buyLink?: string
  listPrice?: { amount: number; currencyCode: string }
}

export type Note = {
  id: string
  title: string
  message: string
  lastUpdated: string
}

/** A note as submitted. The id and timestamp are the server's to assign. */
export type NewNote = Pick<Note, 'title' | 'message'>

export type BookType = {
  id: string
  isFavorite?: boolean
  volumeInfo: VolumeInfo
  notes?: Note[]
  saleInfo: SaleInfo
  selfLink: string
}

export type SavedBook = {
  [key: string]: BookType
}

export type FormValues = {
  searchStr: string
  title: string
  noteText: string
}
