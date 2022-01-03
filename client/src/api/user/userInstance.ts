import axios, { AxiosResponse } from "axios";
import { PROFILE_USER_URL } from "../../config/default";
import { BAD_REQUEST, FORBIDDEN, SERVER_ERROR } from "./../../helpers/errors/errorMessages";
import { AUTH_USER_URL } from "./../../config/default";
import { errorMessageType } from "./../../types/errorMessage";
axios.defaults.withCredentials = true;

export const helperErrorMessge = (resMsg: string, msg: errorMessageType) => {
    return resMsg === msg.message[0];
};

export const checkBasicErrors = (resMsg: string) => {
    if (helperErrorMessge(resMsg, SERVER_ERROR)) {
        window.location.href = "/errors/serverError";
        return null;
    }
    if (helperErrorMessge(resMsg, BAD_REQUEST)) {
        window.location.href = "/errors/badRequest";
        return null;
    }
    return true;
};

export const checkForbiddenError = (resMsg: string) => {
    if (helperErrorMessge(resMsg, FORBIDDEN)) {
        window.location.href = "/errors/forbidden";
        return null;
    }
    return true;
};

export const networkError = () => {
    window.location.href = "/errors/network";
    return null;
};
export const basicErrors = (res: AxiosResponse) => {
    const message = res.data.message[0];
    const flag = checkBasicErrors(message);
    if (!flag) return null;
    return res;
};
export const basicAndForbiddenErrors = (res: AxiosResponse) => {
    const message = res.data.message[0];
    let flag = checkForbiddenError(message);
    if (!flag) return null;
    flag = checkBasicErrors(message);
    if (!flag) return null;
    return res;
};

export const userProfileAccessInstance = axios.create({
    baseURL: PROFILE_USER_URL,
});

export const userAuthAccessInstance = axios.create({
    baseURL: AUTH_USER_URL,
});

export const userAuthInstance = axios.create({
    baseURL: AUTH_USER_URL,
});

userAuthInstance.interceptors.response.use((res) => basicErrors(res), networkError);

userAuthAccessInstance.interceptors.response.use((res) => basicAndForbiddenErrors(res), networkError);

userProfileAccessInstance.interceptors.response.use((res) => basicAndForbiddenErrors(res), networkError);
