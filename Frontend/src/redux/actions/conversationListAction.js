import axios from 'axios';
import {
    CONVERSATION_LIST_FAIL,
    CONVERSATION_LIST_SUCCESS
} from '../actionTypes/conversationTypes';

export const getAllFriends = () => async (dispatch) => {

    try {
        const friends = await axios.get('http://localhost:3000/api/messanjar/get-conversations')

     
        dispatch({
            type: CONVERSATION_LIST_SUCCESS,
            payload: friends.data.data
        })



    } catch (error) {
        console.log("Conversation list getting error: " + error);
        dispatch({
            type: CONVERSATION_LIST_FAIL,
            payload: error
        })
    }
}