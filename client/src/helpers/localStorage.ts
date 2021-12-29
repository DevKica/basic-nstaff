import { userData } from "../constants/localStorage";
import { userDataType } from "../types/user";

export const getUserDataLocalStorage = () => localStorage.getItem(userData);
export const setUserDataLocalStorage = (data: userDataType | null) => {
    localStorage.setItem(userData, JSON.stringify(data));
};
export const removeUserDataLocalStorage = () => {
    localStorage.removeItem(userData);
};
