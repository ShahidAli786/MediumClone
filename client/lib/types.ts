export interface Post {
  _id: string;
  title: string;
  postcontent: string;
  category: string;
  likes: {
    user: {
      name: string;
      username: string;
      image: string;
    };
    timestamp: string;
  };
  bookmarks: {
    user: {
      name: string;
      username: string;
      image: string;
    };
    timestamp: string;
  };
  image: string;
  _createdAt: string;
  author: {
    name: string;
    username: string;
    image: string;
  };
  isLiked: boolean | false;
  isBookmarked: boolean | false;
}
