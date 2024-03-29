import axios from "axios";

import axiosInstance from "../../../utils/axios";
import { FAIL, SUCCESS } from "../../actionTypes/actionTypes";

export const userRegister = (formData) => {

    return async (dispatch) => {
        try {
            // let res = await axios.post('http://localhost:3000/api/auth/user-register', formData)
            let res = await axiosInstance.post('/auth/user-register', formData)

            //set the token to cookie 
            document.cookie = `authToken=${res.data.token}`

            localStorage.setItem('authToken', res.data.token)

            dispatch({
                type: SUCCESS,
                payload: {
                    data: res.data.message,
                    token: res.data.token
                }
            })

        } catch (error) {
            console.log(error);
            dispatch({
                type: FAIL,
                payload: error.response.data.error
            })
        }
    }
}