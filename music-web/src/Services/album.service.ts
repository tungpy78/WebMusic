import {get} from "../Utils/authorizedAxios";

export const getAllAlbum = async () => {
    const result = await get(`album`);
    return result;
}
export const getAlbumById = async (albumId: string) => {
    const result = await get(`album/${albumId}`);
    return result;
}
