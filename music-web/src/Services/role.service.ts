import {get} from "../Utils/authorizedAxios";

export const getRole = async () => {
    const result = await get(`auth/getrole`);
    return result.data;
}