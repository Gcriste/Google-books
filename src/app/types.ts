type VolumeInfo = {
  title: string;
  description: string;
  infoLink: string;
  imageLinks: {
    thumbnail: string;
    title: string;
  };
};

type Review = {
  message: string
  lastUpdated: string
  rating: string
}

export type Book = {
  id: string;
  isFavorite?: boolean;
  volumeInfo: VolumeInfo;
  reviews?: (VolumeInfo & Review)[];
};
