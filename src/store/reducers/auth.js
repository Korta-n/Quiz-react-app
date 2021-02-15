import {
    AUTH_SUCCESS,
    AUTH_LOG_OUT,
    AUTH_ERROR_HANDLER,
} from '../actions/actionsTypes'
const initialState = {
    token: null,
    AuthError: null,
    CurrentUserEmail: null,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                CurrentUserEmail: action.email,
            }
        case AUTH_LOG_OUT:
            return {
                ...state,
                token: null,
                CurrentUserEmail: null,
            }
        case AUTH_ERROR_HANDLER:
            return {
                ...state,
                AuthError: action.error,
            }
        default:
            return state
    }
}
