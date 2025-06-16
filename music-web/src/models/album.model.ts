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