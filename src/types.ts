export type Book = {
    id: string;
    volumeInfo: {
      title: string;
      description: string;
      infoLink: string
      imageLinks: {
        thumbnail: string;
        title: string;
      };
    };
  };