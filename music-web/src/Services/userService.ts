import { post } from "../Utils/authorizedAxios";


const login = async (phone: string, password: string) => {
    const response = await post("auth/login", { phone, password });
    return response;
}
export const userService = {
    login,
}