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
    isSuccess: false,
    isAuthenticated: false,
    success: "",
    errors: [],
    data: {}
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


//Get the token  from local storage
const token = localStorage.getItem('authToken')
//If the token data is available get the user data from the token and set on the local state
if (token) {
    //Get the user data from the token
    const userDataFromToken = jwtDecode(token)
    //If user data is available set on the local state
    if (userDataFromToken) {
        initialState.isAuthenticated = true
        initialState.data = {
            ...initialState.data,
            ...userDataFromToken
        }
    }
}

console.log("Initial state from reducers: ")
console.log(initialState);


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
                    isSuccess: true,
                    success: payload.data,
                    isError: false,
                    isAuthenticated: true,
                    message: payload.data,
                    data: [userData]
            }


            default:
                return state;
    }
}