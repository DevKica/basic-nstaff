import axios from "axios";
import { AUTH_USER_URL } from "../../config/default";
import { ChangePasswordBody, PasswordsBody, LoginBody, RegisterBody, PasswordCheckBody } from "../../types/body";
import { EmailBody } from "./../../types/body";
import { userAuthInstance, userAuthAccessInstance } from "./userInstance";

export const deepAuthActiveUser = () => axios.post(`${AUTH_USER_URL}/deepAuthActive`).catch((e) => e.message);
export const getUserData = () => axios.get(`${AUTH_USER_URL}/getUserData`).catch((e) => e.message);
export const singleLogout = () => axios.patch(`${AUTH_USER_URL}/deleteSingleSession`).catch((e) => e.message);

export const registerUser = (body: RegisterBody) => userAuthInstance.post(`/register`, body);
export const loginUser = (body: LoginBody) => userAuthInstance.post(`/login`, body);
export const googleLogin = (googleToken: string) => userAuthInstance.post(`/googleLogin/${googleToken}`);
export const googleRegister = (googleToken: string, body: PasswordsBody) => userAuthInstance.post(`${AUTH_USER_URL}/googleRegister/${googleToken}`, body);

export const confirmEmail = (token: string | undefined) => userAuthInstance.post(`/confirmEmail/${token}`);
export const changeEmail = (body: LoginBody) => userAuthAccessInstance.patch(`/changeEmail`, body);
export const resendEmail = () => userAuthAccessInstance.post(`/resendEmailConfirmation`);

export const changePassword = (body: ChangePasswordBody) => userAuthAccessInstance.patch(`/changePassword`, body);

export const resetPassword = (body: EmailBody) => userAuthInstance.post(`/sendResetPasswordEmail`, body);
export const verifyResetPasswordToken = (token: string | undefined) => userAuthAccessInstance.post(`/verifyResetPasswordToken/${token}`);
export const setNewPassword = (token: string | undefined, body: PasswordsBody) => userAuthAccessInstance.patch(`/setNewPassword/${token}`, body);

export const logoutFromAll = () => userAuthAccessInstance.patch(`/deleteAllSessions`);

export const deleteUserAccount = (body: PasswordCheckBody) => userAuthAccessInstance.post(`/deleteAccount`, body);
