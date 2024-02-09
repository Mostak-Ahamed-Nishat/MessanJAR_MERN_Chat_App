import {
    CONVERSATION_LIST_FAIL,
    CONVERSATION_LIST_SUCCESS
} from './../actionTypes/actionTypes';


const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    errors: [],
    data: []
}
console.log("THIS PAGE HIT");

export const getAllConversationList = (state = initialState, action) => {
    const {
        payload,
        type
    } = action


    switch (type) {
        case CONVERSATION_LIST_FAIL:
            console.log("Conversation reducer failed");
            return state = {
                ...state,
                isLoading: false,
                isSuccess: false,
                isError: true,
                errors: payload,
            }

        case CONVERSATION_LIST_SUCCESS:
            if (Array.isArray(payload)) { // Check if payload is an array
                return {
                    ...state,
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    data: [...payload],
                };
            } else {
                // Handle the case where payload is not an array
                console.error("Payload is not an array:", payload);
                return state;
            }
            default:
                return state
    }


}