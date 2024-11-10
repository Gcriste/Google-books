type VolumeInfo = {
  title: string;
  subtitle?: string
  description?: string;
  infoLink: string;
  imageLinks: {
    thumbnail: string;
    title: string;
  };
  authors?: string[]
  categories: string[]
  publisher: string
  publishedDate: string
};

type SaleInfo = {
  buyLink?: string
  listPrice?: {amount: number, currencyCode: string}
}

 export type Review = {
  id: string
  title: string;
  message: string;
  lastUpdated: string;
  rating: number;
};

export type BookType = {
  id: string;
  isFavorite?: boolean;
  volumeInfo: VolumeInfo;
  reviews?: Review[];
  saleInfo: SaleInfo
  selfLink: string
};

export type SavedBook = {
  [key: string]: BookType;
};



export type FormValues = {
  searchStr: string;
  title: string;
  reviewText: string;
  rating: number;
};