import axios from "axios"
import {
    getAuthToken
} from "../../../../lib/getAuthToken"

export const authAction = (formData) => {
    return async (dispatch) => {
        try {

            //Get the token from browser cookies
            const token = getAuthToken('authToken')

            const res = await axios.post('http://localhost:3000/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            document.cookie = `authToken=${res.data.token}`

        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}