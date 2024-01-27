import axios from "axios";

export const userRegister = (formData) => {
    return async (dispatch) => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const result = await axios.post('/api/auth/messanjar/registration', formData, config)
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }


        axios
            .post("", formData)
            .then((res) => console.log(res))
            .catch((e) => {
                console.log(e);
            });
    }
}