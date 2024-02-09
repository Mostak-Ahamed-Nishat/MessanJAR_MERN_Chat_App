import axiosInstance from "../../../utils/axios"

import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from "../../actionTypes/actionTypes"

export const authAction = (formData) => {

    return async (dispatch) => {
        try {

            //Get the token from browser cookies
            // const res = await axiosInstance.post('http://localhost:3001/api/auth/login', formData, {
            const res = await axiosInstance.post('/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            localStorage.setItem('authToken', res.data.token);
            //Set the cookie to the cookie
            document.cookie = `authToken=${res.data.token};SameSite=None; Secure`
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    data: res.data.message,
                    token: res.data.token
                }
            })

        } catch (error) {
            dispatch({
                type: AUTH_FAIL,
                payload: error.response.data.error ? error.response.data.error : ""
            })
        }
    }
}