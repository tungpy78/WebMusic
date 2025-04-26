export interface Playlist {
    _id: string;
    name: string;
    userId: {
      _id: string;
      fullname: string;
    };
    songs: {
      _id: string;
      songId: string;
    }[];
    createdAt: string;
  }