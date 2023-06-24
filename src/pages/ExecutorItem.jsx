import React, {useEffect, useState} from 'react';
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {ListItem, ListItemText} from "@mui/material";

const ExecutorItem = ({user_id, vacancy_id, exec_id}) => {
    const [listExecutors, setListExecutors] = useState({})
    const [error, setError] = React.useState(null);

    useEffect(() => {
        async function get_user (id) {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}`, config);
                    setListExecutors({...listExecutors, [id]: `${res.data.first_name} ${res.data.last_name} (опыт ${res.data.experience} месяцев)`});
                } catch (error) {
                    setError(error);
                }
            } else {
                setError("error");
            }
        }
        get_user(user_id).then()
    }, [])

    async function add_executor (user_id, vacancy_id) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                const body = JSON.stringify({ 'exec_pk': user_id });

                await axios.post(`${process.env.REACT_APP_API_URL}/api/vacancy/${vacancy_id}/add_executor/`, body, config);
            } catch (error) {
                setError(error);
            }
        } else {
            setError("error");
        }
    }

    return (
        <div>
            {user_id === exec_id
                ? <ListItem><ListItemText primary={`${listExecutors[user_id]} отмечен как исполнитель`} /></ListItem>
                :<ListItem
                    key={user_id}
                    disableGutters
                    secondaryAction={
                        <IconButton aria-label="comment" onClick={() => add_executor(user_id, vacancy_id)}>
                            <AddCircleIcon />
                        </IconButton>
                    }
                >
                    <ListItemText primary={`${listExecutors[user_id]} откликнулся`} />
                </ListItem>
            }
        </div>
    );
};

export default ExecutorItem;