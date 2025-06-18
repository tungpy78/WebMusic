
import { ArtistRequest } from "../models/artist.model";
import { get, patchFormData, postFormData } from "../Utils/authorizedAxios";

export const getArtist = async()=>{
    const result = await get(`admin/artist/getall`);
    return result;
}

export const createArtist = async(artistRequest:ArtistRequest)=>{
    const formData = new FormData();
        formData.append("name", artistRequest.name);
        formData.append("bio", artistRequest.bio);
        
        if (artistRequest.fileAvata) {
            formData.append("fileAvata", artistRequest.fileAvata);
        }
    
        const result = await postFormData('artist/creat', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return result;
}

export const updateArtist = async(artistId: string,artistRequest: ArtistRequest) =>{
    const formData = new FormData();
    formData.append("name", artistRequest.name);
    formData.append("bio", artistRequest.bio);
    
    if (artistRequest.fileAvata) {
        formData.append("fileAvata", artistRequest.fileAvata);
    }

    const result = await patchFormData(`artist/update/${artistId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return result;
}

export const getArtistById = async (artistId: string) => {
    const result = await get(`artist/${artistId}`);
    return result;
}
