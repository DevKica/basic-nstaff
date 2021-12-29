import { AUTH } from "../actionTypes/auth";
import { userDataType } from "../../types/user";
import { setUserDataLocalStorage, removeUserDataLocalStorage } from "./../../helpers/localStorage";
import { USER_LS_FORMAT } from "./../../helpers/userFormat";

const authReducer = (state = { authData: null, isAuthenticated: null, isActive: false }, action: { payload?: userDataType; type: string }) => {
    const formattedUser = USER_LS_FORMAT(action.payload);
    switch (action.type) {
        case AUTH.SET_ACTIVE_USER:
            setUserDataLocalStorage(formattedUser);
            return { ...state, authData: formattedUser, isAuthenticated: true, isActive: true };
        case AUTH.SET_USER:
            setUserDataLocalStorage(formattedUser);
            return { ...state, authData: formattedUser, isAuthenticated: true, isActive: false };
        case AUTH.REMOVE_USER:
            removeUserDataLocalStorage();
            return { ...state, authData: null, isAuthenticated: false, isActive: false };
        default:
            return state;
    }
};

export default authReducer;
