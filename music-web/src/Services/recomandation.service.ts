import {get,post} from "../Utils/authorizedAxios";

export const postRelatedSongs = async(songid: string , excludeIds: string[]) => {
    const result = await post(`recommendation/related`, { songid, excludeIds });
    return result;
}
export const getRecommendedSongs = async() => {
    const result = await get(`recommendation/homepage`);
    return result;
}   