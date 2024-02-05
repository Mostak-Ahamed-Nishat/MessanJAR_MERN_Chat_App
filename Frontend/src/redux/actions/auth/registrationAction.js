import axios from "axios";
import {
    FAIL,
    SUCCESS
} from "../../actionTypes/userRegistrationTypes";

export const userRegister = (formData) => {

    return async (dispatch) => {
        try {
            console.log("Hit the API");
            let res = await axios.post('http://localhost:3000/api/auth/user-register', formData)
            localStorage.setItem('authToken', res.data.token)
            dispatch({
                type: SUCCESS,
                payload: {
                    data: res.data.message,
                    token: res.data.token
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            dispatch({
                type: FAIL,
                payload: error.response.data.error
            })
        }
    }
}