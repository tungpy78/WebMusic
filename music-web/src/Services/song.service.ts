import {get, patchFormData, post, postFormData, patch} from "../Utils/authorizedAxios";

export const getSongsByArtist = async(artist_id: string) =>{
    const result = await get(`song/artist/${artist_id}`);
    return result;
}

export const getSong = async (songId: string) => {
    const result = await get(`song/${songId}`);
    return result;
}

export const getAllSong = async () => {
    const result = await get(`song`);
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
export const search = async (keyword: string) => {
    const result = await get(`song/search?keyword=${keyword}`);
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

export const delete_song = async(songId: string) => {
    const result = await patch(`admin/song/delete/${songId}`,{

    });
    return result;
}

export const restore_song = async(songId: string) => {
    const result = await patch(`admin/song/restore/${songId}`,{

    });
    return result;
}

export const getAllSongAdmin = async() => {
    const result = await get(`admin/song/getAllAdmin`);
    return result;
}

export const create_song = async (
    fileaudio: File,
    title: string,
    genre: string,
    fileavatar: File,
    description: string,
    lyrics: string,
    artist: string[]
) => {
    const formData = new FormData();
    formData.append('fileaudio', fileaudio);
    formData.append('fileavatar', fileavatar);
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('lyrics', lyrics);
    for(const artistID of artist){
        formData.append('artist', artistID);
        console.log(artistID);
    }


    const result = await postFormData('admin/song/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return result;
};

export const update_song = async (
    song_id: string,
    fileaudio: File | null,
    title: string,
    genre: string,
    fileavatar: File | null,
    description: string,
    lyrics: string,
    artist: string[]
) => {
    const formData = new FormData();
    if (fileaudio !== null) {
        formData.append('fileaudio', fileaudio);
    }
    formData.append('title', title);
    for(const artistID of artist){
        formData.append('artist', artistID);
        console.log(artistID);
    }
    formData.append('genre', genre);
    if (fileavatar !== null) {
        formData.append('fileavatar', fileavatar);
    }
    formData.append('description', description);
    formData.append('lyrics', lyrics);

    const result = await patchFormData(`admin/song/update/${song_id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return result;
};


