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