import axios from "axios";

export const userRegister = (formData) => {

    return async (dispatch) => {
        try {
            console.log("Hit the API");
            let res = await axios.post('http://localhost:3000/api/auth/user-register', formData)
            console.log(res);

        } catch (error) {
            console.log("Error sending");
            console.log(error);
        }
    }
}