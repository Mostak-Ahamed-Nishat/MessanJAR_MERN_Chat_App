import axios from "axios"

import {
    AUTH_FAIL,
    AUTH_SUCCESS
} from "../../actionTypes/authTypes"


export const authAction = (formData) => {

    return async (dispatch) => {
        try {

            //Get the token from browser cookies
            const res = await axios.post('http://localhost:3000/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            //Set the cookie to the cookie
            document.cookie = `authToken=${res.data.token}`

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