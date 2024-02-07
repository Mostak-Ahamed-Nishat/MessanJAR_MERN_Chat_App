import {
    jwtDecode
} from "jwt-decode";
import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from "../actionTypes/authTypes";
import {
    getAuthToken
} from "../../../lib/getAuthToken";


const initialState = {
    loading: true,
    isError: false,
    isSuccess: false,
    isAuthenticated: false,
    success: "",
    errors: [],
    data: {}
}

//Get the token  from local storage
const token = getAuthToken('authToken')

//If the token data is available get the user data from the token and set on the local state
let user

if (token) {
    //Get the user data from the token
    const userDataFromToken = jwtDecode(token)
    //If user data is available set on the local state
    if (userDataFromToken) {
        user = userDataFromToken
    }
}


export const authReducer = (state = initialState, action) => {
    const {
        payload,
        type
    } = action

    switch (type) {
        case AUTH_FAIL:
            console.log(payload)
            return {
                ...state,
                loading: false,
                    isSuccess: false,
                    isError: true,
                    errors: [...payload]

            };

        case AUTH_SUCCESS:
            //Get the user data from token and send it to client
            return {
                ...state,
                loading: false,
                    isSuccess: true,
                    success: payload.data,
                    isError: false,
                    message: payload.data,
                    data: {
                        ...user
                    }
            }


            default:
                return state;
    }
}