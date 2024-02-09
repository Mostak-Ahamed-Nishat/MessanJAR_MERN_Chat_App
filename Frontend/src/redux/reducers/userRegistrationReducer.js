import {
    FAIL,
    SUCCESS
} from "../actionTypes/userRegistrationTypes";

import {
    jwtDecode
} from "jwt-decode";


const token = localStorage.getItem('authToken');
const initialUserData = token ? jwtDecode(token) : null;

const initialState = {
    loading: true,
    isError: false,
    isSuccess: false,
    isAuthenticated: false,
    success: "",
    errors: [],
    data: initialUserData || {}
}


//Check the expire time is the token timeout or not
const decodeToken = (token) => {
    //get the user data from token
    const decodeTokenData = jwtDecode(token);
    //
    const expireTime = new Date(decodeTokenData.exp * 1000)
    //if token is expired then send null otherwise send the decoded token data
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
                    isSuccess: false,
                    isError: true,
                    errors: [
                        ...payload
                    ]
            };
        case SUCCESS:
            //Get the user data from token and send it to client
            const userData = decodeToken(payload.token)

            return {
                ...state,
                loading: false,
                    isAuthenticated: true,
                    isSuccess: true,
                    success: payload.data,
                    isError: false,
                    message: payload.data,
                    data: userData || state.data,
            }


            default:
                return state;
    }
}
