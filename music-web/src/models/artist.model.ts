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