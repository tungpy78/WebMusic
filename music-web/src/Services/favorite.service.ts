import { get} from "../Utils/authorizedAxios";

export const getFavoritePaginated = async (page: number, limit: number) => {
    const result = await get(`favorite?page=${page}&limit=${limit}`);
    return result;
}
