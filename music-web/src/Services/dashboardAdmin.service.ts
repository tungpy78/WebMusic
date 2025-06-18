import {get} from "../Utils/authorizedAxios";

export const getuser = async()=>{
    const result = await get(`admin/auth/getAllAccount`);
    return result;
}