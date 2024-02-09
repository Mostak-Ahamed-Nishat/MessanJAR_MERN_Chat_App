import axios from 'axios';
import {
    CONVERSATION_LIST_FAIL,
    CONVERSATION_LIST_SUCCESS
} from '../actionTypes/conversationTypes';
import axiosInstance from '../../utils/axios';

export const getAllFriends = () => async (dispatch) => {

    try {
        const friends = await axiosInstance.get('/messanjar/get-conversations')
        dispatch({
            type: CONVERSATION_LIST_SUCCESS,
            payload: friends.data.data
        })

    } catch (error) {
        // console.log(error.response.data.error);
        dispatch({
            type: CONVERSATION_LIST_FAIL,
            payload: error.response.data.error
        })

        window.location.href = 'http://localhost:5173/';
    }
}