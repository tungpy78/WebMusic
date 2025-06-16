import {get} from "../Utils/authorizedAxios";

export const getArtistById = async (artistId: string) => {
    const result = await get(`artist/${artistId}`);
    return result;
}
