type VolumeInfo = {
  title: string;
  description: string;
  infoLink: string;
  imageLinks: {
    thumbnail: string;
    title: string;
  };
};

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