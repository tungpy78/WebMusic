import { data } from "react-router-dom";
import {get, post} from "../Utils/authorizedAxios";

export const getRole = async () => {
    const result = await get(`role`);
    return result;
}

export const addRole = async () =>{
    const result = await post('role', {});
    return result;
}