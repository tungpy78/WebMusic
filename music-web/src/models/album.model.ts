export type Artist = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type Song = {
  _id: string;
  title: string;
  avatar: string;
};

export type AlbumResponsor = {
    _id: string,
    album_name: string;
    decription: string;
    release_day: string;
    avatar: string;
    artist: Artist;
    songs: Song[];
};

export type AlbumRequest ={
    album_name: string;
    decription: string;
    release_day: string;
    avatar: File | null;
    artist: string;
    songs: string[];
}