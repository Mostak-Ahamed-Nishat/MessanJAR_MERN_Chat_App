import axiosInstance from '../../utils/axios';
import {
    MESSAGES_GET_FAIL,
    MESSAGES_GET_SUCCESS,
    MESSAGE_SENT_FAIL,
    MESSAGE_SENT_SUCCESS,
    MESSAGES_IMAGE_SEND_SUCCESS,
    MESSAGES_IMAGE_SEND_FAIL
} from '../actionTypes/actionTypes';


//Send the message to the database
export const messageSendAction = (data) => async (dispatch) => {
    try {
        const res = await axiosInstance.post('/messages', data)

        dispatch({
            type: MESSAGE_SENT_SUCCESS,
            payload: res.data && res.data.data
        })



    } catch (error) {
        dispatch({
            type: MESSAGE_SENT_FAIL,
            payload: error.response.data.error
        })
    }
}


//Get all the message with the open chat friend
export const getMessageAction = (current_Open_Chat_Id_With_Friend) => async (dispatch) => {
    const id = current_Open_Chat_Id_With_Friend
    try {
        const res = await axiosInstance.get(`/messages/chat/${id}`)
        dispatch({
            type: MESSAGES_GET_SUCCESS,
            payload: res.data.data
        })
    } catch (error) {
        dispatch({
            type: MESSAGES_GET_FAIL,
            payload: error.data
        })
    }
}


//Send the image to the user
export const imageMessageSendAction = (formData) => async (dispatch) => {
    try {
        console.log("Image sent successfully Start");
        const res = await axiosInstance.post('/messages/image', formData)
        dispatch({
            type: MESSAGES_IMAGE_SEND_SUCCESS,
            payload: res.data.data
        })

        console.log("Image sent successfully");
        console.log(res.data.data);

    } catch (error) {

        console.log("Error happened");
        console.log(error.response.data.error);
        dispatch({
            type: MESSAGES_IMAGE_SEND_FAIL,
            payload: error.response
        })
    }
}