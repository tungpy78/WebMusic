import { get} from "../Utils/authorizedAxios";

export const getFavorite = async () => {
    const result = await get(`favorite`);
    return result;
}
