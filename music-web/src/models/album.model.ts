import { Artist, Song } from "./song.model";


export interface Album {
    _id: string;
    songs: Song[];
    avatar: string;
    artist: Artist;
    album_name: string;
    description: string;
    release_day: string;
}

export type ArtistAdmin = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type SongAdmin = {
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
    artist: ArtistAdmin;
    songs: SongAdmin[];
};

export type AlbumRequest ={
    album_name: string;
    decription: string;
    release_day: string;
    avatar: File | null;
    artist: string;
    songs: string[];
}