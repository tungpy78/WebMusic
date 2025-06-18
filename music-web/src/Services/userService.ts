import { post} from "../Utils/authorizedAxios";

const login = async (phone: string, password: string) => {
    const response = await post("auth/login", { phone, password });
    return response;
}
const register = async (fullname: string, phone: string, email: string, password: string) => {
    const response = await post("auth/register", { fullname, phone, email, password });
    return response;
}
const changeProfile = async (email: string, phone: string) => {
    const response = await post("/auth/change-profile", {
        email,
        phone
    });
    return response;
};
const changePassword = async (oldPassword: string, newPassword: string) => {
    const response = await post("auth/change-password", { oldPassword, newPassword });
    return response;
}

const sendEmail = async (email: string) => {
    const response = await post("auth/send-otp", { email });
    return response;
}
const verifyOtp = async (email: string, otp: string) => {
    const response = await post("auth/verify-otp", { email, otp });
    return response;
}
const resetPassword = async (email: string, newPassword: string) => {
    const response = await post("auth/reset-password", { email, newPassword });
    return response;
}

export const userService = {
    login,
    register,
    sendEmail,
    verifyOtp,
    resetPassword,
    changePassword,
    changeProfile
}