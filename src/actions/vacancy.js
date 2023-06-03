import axios from "axios";
import {USER_LOADED_FAIL, USER_LOADED_SUCCESS} from "./types";

export const add_vacancy = async (name, text, min_experience, price) =>{
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ name, text, min_experience, price });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/vacancy/`, body,  config);


        } catch (err) {

        }
    }
    else {

    }
}

export const update_vacancy = async (id, name, text, min_experience, price) =>{
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ name, text, min_experience, price });

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/vacancy/${id}/`, body,  config);


        } catch (err) {

        }
    }
    else {

    }
}