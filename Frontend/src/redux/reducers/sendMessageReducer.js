import {
    MESSAGE_SENT_SUCCESS,
    MESSAGE_SENT_FAIL,
    SOCKET_REAL_TIME_MESSAGE
} from './../actionTypes/actionTypes';


const initialState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
    errors: [],
    messages: []
}


export const sendMessageReducer = (state = initialState, action) => {
    const {
        payload,
        type
    } = action

    switch (type) {

        case MESSAGE_SENT_FAIL:
            return state = {
                ...state,
                isLoading: false,
                isSuccess: false,
                isError: true,
                errors: payload,
            }

        case MESSAGE_SENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                    isSuccess: true,
                    isError: false,
                    messages: [payload],
            }

            case SOCKET_REAL_TIME_MESSAGE:
                return {
                    ...state,
                    isLoading: false,
                        isSuccess: true,
                        isError: false,
                        messages: [payload],
                }
                default:
                    return state
    }


}