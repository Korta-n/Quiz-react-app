import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOG_OUT, AUTH_ERROR_HANDLER } from './actionsTypes'

export const auth = (email, password, isLoggedIn) => {
    return async (dispatch) => {
        dispatch(AuthErrorHandler())
        const authData = {
            email,
            password,
            returnSecureToken: true,
        }
        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTge5sUoprLQPxrZ8MXPidOSzD0_q_ivM'
        if (isLoggedIn)
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTge5sUoprLQPxrZ8MXPidOSzD0_q_ivM'
        try {
            const response = await axios.post(url, authData)
            const data = response.data
            const ExpirationDate = new Date(
                new Date().getTime() + data.expiresIn * 1000
            )
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('ExpirationDate', ExpirationDate)
            localStorage.setItem('UserEmail', data.email)
            dispatch(authSuccess(data.idToken, data.email))
            dispatch(autoLogOut(data.expiresIn))
        } catch (e) {
            dispatch(AuthErrorHandler(e))
        }
    }
}
export const AuthErrorHandler = (error = null) => {
    return {
        type: AUTH_ERROR_HANDLER,
        error,
    }
}
export const authSuccess = (token, email) => {
    return {
        type: AUTH_SUCCESS,
        token,
        email,
    }
}
export const autoLogOut = (time) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(logOut())
        }, time * 1000)
    }
}
export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('ExpirationDate')
    localStorage.removeItem('UserEmail')
    return {
        type: AUTH_LOG_OUT,
    }
}
export const autoLogIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logOut())
        } else {
            const email = localStorage.getItem('UserEmail')
            const expirationDate = new Date(
                localStorage.getItem('ExpirationDate')
            )
            if (expirationDate < new Date()) {
                dispatch(logOut())
            } else {
                dispatch(authSuccess(token, email))
                dispatch(
                    autoLogOut(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            }
        }
    }
}
