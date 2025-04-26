import { get } from "../Utils/authorizedAxios";


export const getTopic = async () => {
    const result = await get(`topic`);
    return result;
}

export const getSongByTopic = async (topicId: string) => {
    const result = await get(`topic/${topicId}`);
    return result;
}
