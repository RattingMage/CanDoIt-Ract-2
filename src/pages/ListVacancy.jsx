import React, {useEffect, useState} from 'react';
import axios from "axios";
import {VACANCY_LOAD_FAIL, VACANCY_LOAD_SUCCESS} from "../actions/types";
import Vacancy from "./Vacancy";
import {connect} from "react-redux";
import login from "./Login";
import AddIcon from "@mui/icons-material/Add";
import {Fab, Pagination, PaginationItem} from "@mui/material";
import {Link} from "react-router-dom";

const ListVacancy = ({isAuthenticated, user, login}) => {
    const [vacancies, setVacancies] = useState(null);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(null);
    const [error, setError] = React.useState(null);

    async function load(page=1)  {
        if (localStorage.getItem('access')) {
            let res;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };

            try {
                res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vacancy/?page=${page}`, config);
                setCount(res.data.count)
                setVacancies(res.data)
            } catch (err) {
                return(setError(error));
            }
        } else {
            return(setError(error));
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
        load(value)
    };

    useEffect(() => {
        load().then(r => {        })
    }, [])

    if (error) return <h1>`Error ${error.message}`</h1>;
    if (!vacancies) return <h1>Нет вакансий</h1>

    const FAB = () => (
        <Link className='nav-link' to="/vacancy/add">
            <Fab color="primary" aria-label="add" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}>
                <AddIcon />
            </Fab>
        </Link>
    )

    return (
        <div>
            {user.role === "EMPLOYER" ? FAB() : <div></div>}

            {
                vacancies.results.map(vacancy =>
                    <Vacancy vacancy={vacancy} key={vacancy.id}/>
                )
            }
            <Pagination
                count={Math.ceil(count / 5)}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
            />
        </div>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});
export default connect(mapStateToProps, {login}) (ListVacancy);