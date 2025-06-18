import { get } from "../Utils/authorizedAxios"

export const getAllHistory = async() =>{
        const result = await get('admin/historyAction');
        return result;
}