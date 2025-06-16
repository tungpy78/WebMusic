import {get, post, patch} from "../Utils/authorizedAxios";

export const getAccountDetail = async () => {
    const result = await get(`auth/getaccount`);
    return result.data;
}

export const post_status = async (account_id: String) => {
    const result = await patch(`auth/setStatus/${account_id}`,
        {
        }
    );
    return result.data;
}

export const reset_pass = async (account_id: String) => {
    const result = await post(`auth/setpassdefault/${account_id}`,
        {
        }
    );
    return result.data;
}

export const create_account = async (fullname: string, email: string, phone: string) => {
    const result = await post(`auth/create`,
        {
            fullname, email,  phone
        }
    );
    return result.data;
}