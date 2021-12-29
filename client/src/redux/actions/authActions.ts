import store from "../store";
import { AUTH } from "../actionTypes/auth";

export const setUserData = (user: any) => {
    if (user.active) {
        store.dispatch({ type: AUTH.SET_ACTIVE_USER, payload: user });
    } else {
        store.dispatch({ type: AUTH.SET_USER, payload: user });
    }
};

export const getStoreUserAuth = () => store.getState().auth;
//@ts-ignore
export const getStoreUserAuthData = () => store.getState().auth.authData;

export const removeUserData = () => store.dispatch({ type: AUTH.REMOVE_USER });
