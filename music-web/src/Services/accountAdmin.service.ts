import {get, post, patch} from "../Utils/authorizedAxios";

export const getAccountDetail = async () => {
    const result = await get(`admin/auth/getaccount`);
    return result.data;
}

export const post_status = async (account_id: String) => {
    const result = await patch(`admin/auth/setStatus/${account_id}`,
        {
        }
    );
    return result.data;
}

export const reset_pass = async (account_id: String) => {
    const result = await patch(`admin/auth/setpassdefault/${account_id}`,
        {
        }
    );
    return result.data;
}

export const create_account = async (fullname: string, email: string, phone: string) => {
    const result = await post(`admin/auth/create`,
        {
            fullname, email,  phone
        }
    );
    return result.data;
}