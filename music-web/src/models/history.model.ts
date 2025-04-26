import { Song } from "./song.model";

export interface History {
    _id: string,
    userId: string,
    songId: Song,
    listenedAt:Date
  }