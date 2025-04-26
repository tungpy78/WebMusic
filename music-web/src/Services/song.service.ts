import { get, post } from "../Utils/authorizedAxios";

export const getSong = async (songId: string) => {
    const result = await get(`song/${songId}`);
    return result;
}

export const addFavorite = async(songId: string) => {
    const result = await post(`song/${songId}/favorite`,
        {
            songId
        }
    );
    return result;
}

export const addPlayList = async(songId: string,playListId: string) => {

    const result = await post(`song/${songId}/playList`,
        {
            playListId
        }
    );
    return result;
}
export const createPlayList = async(songId: string,name: string) => {
    
    const result = await post(`song/${songId}/createPlayList`,
        {
            name
        }
    );
    return result;
}
export const addHistory = async(songId: string) => {
    const result = await post(`song/${songId}/addHistory`,{
        songId
    })
    return result;
}