import axiosInstance from '../../utils/axios';
import {
    MESSAGES_GET_FAIL,
    MESSAGES_GET_SUCCESS,
    MESSAGE_SENT_FAIL,
    MESSAGE_SENT_SUCCESS
} from '../actionTypes/actionTypes';


//Send the message to the database
export const messageSendAction = (data) => async (dispatch) => {
    try {
        const res = await axiosInstance.post('/messages', data)
        console.log(res.data);
        dispatch({
            type: MESSAGE_SENT_SUCCESS,
            payload: res.data.data
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: MESSAGE_SENT_FAIL,
            payload: error.response.data.error
        })
    }
}


//Get all the message with the open chat friend
export const getMessageAction = (current_Open_Chat_Id_With_Friend) => async (dispatch) => {
    const id = current_Open_Chat_Id_With_Friend
    console.log(id);
    try {
        const res = await axiosInstance.get(`/messages/chat/${id}`)
        dispatch({
            type: MESSAGES_GET_SUCCESS,
            payload: res.data.data
        })
        console.log(res.data);
    } catch (error) {
        dispatch({
            type: MESSAGES_GET_FAIL,
            payload: error.data
        })
    }
}