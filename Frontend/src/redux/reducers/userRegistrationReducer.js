import {
    FAIL,
    SUCCESS
} from "../actionTypes/userRegistrationTypes";

import {
    jwtDecode
} from "jwt-decode";


const initialState = {
    loading: true,
    isError: false,
    isAuthenticated: false,
    isSuccess: false,
    success: [],
    error: [],
    message: "",
    data: []
}


//Check the expire time is the token timeout or not
const decodeToken = (token) => {
    const decodeTokenData = jwtDecode(token);
    const expireTime = new Date(decodeTokenData.exp * 1000)
    if (new Date() > expireTime) {
        return null
    }
    return decodeTokenData
}

//Decode jwt token
export const userRegistrationReducer = (state = initialState, action) => {
    const {
        payload,
        type
    } = action

    switch (type) {
        case FAIL:
            return {
                ...state,
                loading: false,
                    isError: true,
                    error: payload.error,
            };
        case SUCCESS:
            const userData = decodeToken(payload.token)
            
            return {
                ...state,
                loading: false,
                isError: false,
                isAuthenticated: true,
                message: payload.data,
                data: [userData]
            }


            default:
                return state;
    }
}