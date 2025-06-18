import { Album } from "./album.model";
import { Song } from "./song.model";

export interface Artist {
    _id: string;
    name: string;
    bio: string;
    imageUrl: string;
    songs:Song[];
    albums:Album[];
}

export interface ArtistType {
    _id: string,
    name: string,
    bio: string,
    imageUrl: string,
}
export interface ArtistRequest {
    name: string,
    bio: string,
    fileAvata: File | null,
}