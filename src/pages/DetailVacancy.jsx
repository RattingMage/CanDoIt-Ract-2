import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import {authCheckState} from "../actions/auth";
import {connect} from "react-redux";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { NumericFormat } from 'react-number-format';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {Button, List, ListItem, ListItemText, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {update_vacancy} from "../actions/vacancy";
import ExecutorItem from "./ExecutorItem";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="₽"
        />
    );
});


const DetailVacancy = ({ user, isAuthenticated, authCheckState, load_user_by_id }) => {
    const params = useParams()
    const [vacancy, setVacancy] = useState(null);
    const [error, setError] = React.useState(null);
    const [vacancyDeleted, setVacancyDeleted] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        text: null,
        min_experience: null,
        price: null
    });
    const [isExecutor, setIsExecutor] = useState(false)

    NumericFormatCustom.propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '1320',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    function is_executor_in_list(executors, id){
        executors.forEach((element) => {
            if (element === id) return setIsExecutor(true);
        })
    }

    useEffect(() => {
        async function load()  {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };

                try {
                    const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/vacancy/${params.id}`, config);
                    setVacancy(res1.data)
                    setFormData({
                        name: res1.data.name,
                        text: res1.data.text,
                        min_experience: res1.data.min_experience,
                        price: res1.data.price
                    })
                    is_executor_in_list(res1.data.executors, user.id)
                } catch (err) {
                    setError(error);
                }
            } else {
                setError(error);
            }
        }
        load().then()
        authCheckState();
    }, [])

    async function add_executor_to_list()  {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json',
                }
            };

            const body = JSON.stringify({ user_pk: user.id });

            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/vacancy/${params.id}/add_executor_to_list/`, body, config);
            } catch (err) {
                setError(error);
            }
        } else {
            setError(error);
        }
    }

    const delete_vacancy = async (e) => {
        e.preventDefault()
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/vacancy/${params.id}`, config);
                setVacancyDeleted(true);
            } catch (err) {
                setError(error);
            }
        } else {
            setError(error);
        }
    }

    const {
        name,
        text,
        min_experience,
        price
    } = formData

    const onUpdate = e => {
        e.preventDefault();
        try {
            update_vacancy(
                params.id,
                name,
                text,
                min_experience,
                price
            );
        }
        catch (e){
            console.log(e);
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    if (error) return <h1>`Error ${error.message}`</h1>;
    if (!vacancy) return <h1>Данные не найдены</h1>
    if (vacancyDeleted) return <Navigate to="/login"/>

    if (isAuthenticated) {
        if (user.email === vacancy.employer) {
            return (
                <div>
                    <Card sx={{ maxWidth: "100%", padding: "10px" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {vacancy.employer[0]}
                                </Avatar>
                            }
                            title={`${vacancy.employer}`}
                            subheader={`${vacancy.created}`}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.primary" sx={{ marginBottom: "10px" }}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Text"
                                    name="name"
                                    multiline
                                    fullWidth
                                    rows={2}
                                    defaultValue={vacancy.name}
                                    onChange={e => onChange(e)}
                                />
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "10px"}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Text"
                                    name="text"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    defaultValue={vacancy.text}
                                    onChange={e => onChange(e)}
                                />
                            </Typography>
                            <TextField
                                label="Price"
                                value={vacancy.price}
                                onChange={handleChange}
                                name="price"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumericFormatCustom,
                                }}
                                variant="standard"
                                fullWidth
                                sx={{ marginBottom: "10px" }}
                            />
                        </CardContent>
                        <CardActions sx={{ padding: "10px"}}>
                            <form onSubmit={e => onUpdate(e)}>
                                <Button type="submit" variant="contained" color="info">
                                    Изменить
                                </Button>
                            </form>
                            <form onSubmit={e => delete_vacancy(e)}>
                                <Button type="submit" variant="contained" color="error" >
                                    Удалить
                                </Button>
                            </form>
                        </CardActions>
                    </Card>
                    <div style={{ padding: "10px" }}>
                        <Typography variant="button" display="block" gutterBottom>
                            Список откликнувшихся исполнителей
                        </Typography>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {vacancy.executors.map((value) =>
                                <ExecutorItem user_id={value} vacancy_id={vacancy.id} exec_id={vacancy.executor[0]}></ExecutorItem>
                            )}
                        </List>
                    </div>
                </div>
            );
        } else {
            return (
                <Card sx={{ maxWidth: "100%", padding: "10px"}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {vacancy.employer[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" onClick={() => {console.log("Нравится")}}>
                                <FavoriteBorderOutlinedIcon/>
                            </IconButton>
                        }
                        title={`${vacancy.employer}`}
                        subheader={`${vacancy.created}`}
                    />
                    <CardContent>
                        <Typography variant="body" color="text.primary">
                            {vacancy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {vacancy.text}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ padding: "10px"}}>
                        {isExecutor ? <div>Уже всё</div> : <Button variant="contained" color="success" onClick={add_executor_to_list}>Откликнуться</Button>}
                    </CardActions>
                </Card>
            );
        }
    }
    else { return(<Navigate to="/login"/>); }
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchProps = {
    authCheckState: authCheckState
}

export default connect(mapStateToProps, mapDispatchProps) (DetailVacancy);