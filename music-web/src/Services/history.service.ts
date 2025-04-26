import {get} from "../Utils/authorizedAxios";

export const getHistory = async () => {
    const result = await get(`history`);
    return result;
}
