import { AxiosError } from "axios";
import { get } from "../Utils/authorizedAxios";


export const getTopic = async () => {
    try {
        const result = await get(`topic`);
        return result;
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response;
    }
}