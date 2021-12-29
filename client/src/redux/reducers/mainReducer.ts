import { combineReducers } from "redux";

import authReducer from "./authReducer";
import { userDataType } from "./../../types/user";

export interface stateType {
    auth: {
        authData: userDataType;
        isAuthenticated: boolean | null;
        isActive: boolean;
    };
}

export const reducers = combineReducers({ auth: authReducer });
