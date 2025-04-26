export interface Artist {
    _id: string;
    name: string;
}

export interface Genre {
    _id: string;
    title: string;
}

export interface Song {
    _id: string;
    title: string;
    avatar: string;
    description: string;
    like: number;
    lyrics: string;
    audio: string;
    status: string;
    slug: string;
    deleted: boolean;
    artist: Artist;
    genre: Genre;
}

export interface Playlist1 {
    _id: string;
    name: string;
    userId: {
      _id: string;
      fullname: string;
    };
    songs: {
      _id: string;
      songId: Song;  // Thay đổi kiểu của songId thành Song thay vì string
    }[];
    createdAt: string;
  }