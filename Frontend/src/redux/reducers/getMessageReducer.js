import {
    MESSAGES_GET_FAIL,
    MESSAGES_GET_SUCCESS
} from './../actionTypes/actionTypes';

const initialState = {
    isLoading: true,
    isError: false,
    isSuccess: false,
    error: "",
    messages: []
}

export const getMessagesReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action
    

    switch (type) {
        case MESSAGES_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                    isSuccess: true,
                    // messages: [ ...payload]
                    messages: [...state.messages, ...payload]
            }

            case MESSAGES_GET_FAIL:
                return {
                    ...state,
                    isLoading: false,
                        isError: true,
                        error: payload
                }

                default:
                    return state
    }
}