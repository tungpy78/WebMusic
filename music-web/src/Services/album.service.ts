import { AlbumRequest } from "../models/album.model"
import { get, patch, patchFormData, postFormData } from "../Utils/authorizedAxios"

export const getAlbum = async()=>{
    const result = await get(`album/albumForAdmin`)
    return result
}

export const createAlbum = async(albumRequest:AlbumRequest)=>{
    const formData = new FormData();
            formData.append("album_name", albumRequest.album_name);
            formData.append("release_day", albumRequest.release_day);
            formData.append("decription", albumRequest.decription);
            formData.append("artist", albumRequest.artist);
            for( const  songid of  albumRequest.songs ){
                formData.append("songs", songid);
            }
             
            if (albumRequest.avatar) {
                formData.append("avatar", albumRequest.avatar);
            }
        
            const result = await postFormData('album/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return result;
}

export const changeSong = async(song_id: string[], album_id:string) =>{
    const result = await patch('album/addsongtoalbum',
        {
            "song_id": song_id,
            "album_id":album_id
        });
    return result
}

export const updateAlbum = async(album_id:string,albumRequest:AlbumRequest)=>{
    const formData = new FormData();
            formData.append("album_name", albumRequest.album_name);
            formData.append("release_day", albumRequest.release_day);
            formData.append("decription", albumRequest.decription);
            formData.append("artist", albumRequest.artist);
            if (albumRequest.avatar) {
                formData.append("avatar", albumRequest.avatar);
            }   
            const result = await patchFormData(`album/update/${album_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return result;
}


export const getAllAlbum = async () => {
    const result = await get(`album`);
    return result;
}

export const getAlbumById = async (albumId: string) => {
    const result = await get(`album/${albumId}`);
    return result;
}

