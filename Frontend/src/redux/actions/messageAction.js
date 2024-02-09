import axiosInstance from '../../utils/axios';
import {
    MESSAGE_SENT_FAIL,
    MESSAGE_SENT_SUCCESS
} from '../actionTypes/actionTypes';



export const messageAction = (data) => {
    async (dispatch) => {
        try {
            const res = await axiosInstance.post('/messages', data)
            console.log(res.data);

            dispatch({
                type: MESSAGE_SENT_SUCCESS,
                payload: res.data.data
            })

        } catch (error) {
            console.log(error);

            dispatch({
                type: MESSAGE_SENT_FAIL,
                payload: error.response.data.error
            })
        }
    }
}