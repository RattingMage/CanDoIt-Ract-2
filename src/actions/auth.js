import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT, REFRESH_FAIL, REFRESH_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS, USER_LOADED_FAIL,
    USER_LOADED_SUCCESS, VACANCY_LOAD_FAIL, VACANCY_LOAD_SUCCESS
} from "./types";
import axios from "axios";

export const login_s = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
export const load_user = (user = null) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        }
        catch(e){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};
export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};
export const signup = (email, first_name, last_name, phone, password, role, avatar, skills, experience, company) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, first_name, last_name, phone, password, role, avatar, skills, experience, company});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};
export const update_user = (first_name, last_name, role, phone, company, experience) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, phone, role, experience, company});

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/me/`, body, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_USER_FAIL
        })
    }
};
export const authCheckState = () => {
    return async dispatch => {
        const access = localStorage.getItem('access');
        if (access === undefined) {
            dispatch(logout());
        } else {
            const refresh = localStorage.getItem('refresh');
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ refresh });
            try{
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, body, config);

                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                })
                dispatch(load_user());
            }
            catch(err){
                dispatch({
                    type: REFRESH_FAIL
                })
            }
        }
    }
};