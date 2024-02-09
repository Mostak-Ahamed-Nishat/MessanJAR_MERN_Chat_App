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



const userToken = localStorage.getItem('authToken');
const initialUserData = userToken ? jwtDecode(userToken) : null;

const initialState = {
    loading: true,
    isError: false,
    isSuccess: false,
    isAuthenticated: false,
    success: "",
    errors: [],
    data: initialUserData || {}
}


export const authReducer = (state = initialState, action) => {
    const {
        payload,
        type
    } = action


    switch (type) {
        case AUTH_FAIL:
            console.log("Error payload")
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
            }
            default:
                return state;
    }
}