import { TopicRequest } from "../Pages/Admin/Topic";
import { get, patch, patchFormData, postFormData } from "../Utils/authorizedAxios";


export const getTopic = async () => {
    const result = await get(`topic`);
    return result;
}

export const getTopicAdmin = async () => {
    const result = await get(`topic/adminTopics`);
    return result;
}

export const getSongByTopic = async (topicId: string) => {
    const result = await get(`topic/${topicId}`);
    return result;
}

export const createTopic = async(topicRequest: TopicRequest) =>{
    const formData = new FormData();
    formData.append("title", topicRequest.title);
    formData.append("description", topicRequest.description);
    
    if (topicRequest.fileAvata) {
        formData.append("fileAvata", topicRequest.fileAvata);
    }

    const result = await postFormData('topic/create', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return result;
}

export const updateTopic = async(topicId: string,topicRequest: TopicRequest) =>{
    const formData = new FormData();
    formData.append("title", topicRequest.title);
    formData.append("description", topicRequest.description);
    
    if (topicRequest.fileAvata) {
        formData.append("fileAvata", topicRequest.fileAvata);
    }

    const result = await patchFormData(`topic/update/${topicId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return result;
}

export const deleteTopic = async (topicId: string) => {
    const result = await patch(`topic/delete/${topicId}`,{});
    return result;
}

export const restoreTopic = async (topicId: string) => {
    const result = await patch(`topic/restore/${topicId}`,{});
    return result;
}