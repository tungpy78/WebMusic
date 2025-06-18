import {get,post} from "../Utils/authorizedAxios";

export const getRole = async () => {
    const result = await get(`admin/auth/getrole`);
    return result.data;
}

export const addRole = async () =>{
    const result = await post('admin/role', {});
    return result;
}