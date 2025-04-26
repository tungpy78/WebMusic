import { del, get, post} from "../Utils/authorizedAxios";

export const getPlayList = async () => {
    const result = await get(`playlist`);
    return result;
}


export const getPlayListDetail = async (playlistId: string) => {
    const result = await post(`playlist/${playlistId}`,
        {
            playlistId
        }
    );
    return result;
}

export const removeSongPlayList = async (songId: string, playlistId:string) => {
    const result = await del(`playlist/${playlistId}/song/${songId}`)
    return result
}

export const deletePlayList = async (playlistId: string) => {
    const result = await del(`playlist/${playlistId}/delete`)
    return result
}
