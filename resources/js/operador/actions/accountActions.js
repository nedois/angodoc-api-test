import axios from "axios";
import authService from "../services/authService";
import { API_BASE_URL } from "../config";

export const LOGIN_REQUEST = "@account/login-request";
export const LOGIN_SUCCESS = "@account/login-success";
export const LOGIN_FAILURE = "@account/login-failure";
export const LOGOUT = "@account/logout";
export const UPDATE_PROFILE = "@account/update-profile";
export const SILENT_LOGIN = "@account/silent-login";

export function login() {
    return async dispatch => {
        try {
            dispatch({ type: LOGIN_REQUEST });

            const user = await axios
                .get(API_BASE_URL + "/me")
                .then(response => response.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user
                }
            });

            if (!user) {
                dispatch({ type: LOGIN_FAILURE });
            }

            return user;
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE });
            throw error;
        }
    };
}

export function setUserData(user) {
    return dispatch =>
        dispatch({
            type: SILENT_LOGIN,
            payload: {
                user
            }
        });
}

export function logout() {
    return async dispatch => {
        authService.logout();

        dispatch({
            type: LOGOUT
        });
    };
}

export function updateProfile(update) {
    const request = axios.post(APP_URL + "/api/account/profile", { update });

    return dispatch => {
        request.then(response =>
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
        );
    };
}
