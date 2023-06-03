import React, {useState} from 'react';
import Select from "../components/UI/Select/Select";
import {signup} from "../actions/auth";
import {Navigate, redirect} from "react-router-dom";
import {connect} from "react-redux";
import ReactPhoneInput from 'react-phone-input-mui';
import {Grid, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        password: '',
        role: '',
        avatar: '',
        skills: '',
        experience: '',
        company: ''
    });

    const {
        email,
        first_name,
        last_name,
        phone,
        password,
        role,
        avatar,
        skills,
        experience,
        company
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const setRole = (newRole) => {
        setFormData({...formData, ["role"]: newRole});
    }

    const setExperience = (newExperience) => {
        setFormData({...formData, ["experience"]: newExperience});
    }

    const setCompany = (newCompany) => {
        setFormData({...formData, ["company"]: newCompany});
    }

    const setPhone = (newPhone) => {
        setFormData({...formData, ["phone"]: newPhone});
    }

    const onSubmit = e => {
        e.preventDefault();

        try {
            signup(
                email,
                first_name,
                last_name,
                phone,
                password,
                role,
                avatar,
                skills,
                experience,
                company
                );
            setAccountCreated(true);
        }
        catch (e){
            console.log(e);
        }
    };

    if (isAuthenticated){
        return(<Navigate to="/home"/>);
    }
    if(accountCreated){
        return(<Navigate to="/login"/>);
    }

        return (
        <div style={{margin: "50px"}}>
            <form onSubmit={e => onSubmit(e)}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input name='email' type="email" className="form-control" id="inputEmail3" onChange={e => onChange(e)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input name='password' type="password" className="form-control" id="inputPassword3" onChange={e => onChange(e)}/>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Your name</span>
                    <input name="first_name" type="text" aria-label="First name" className="form-control" placeholder={"First name"} onChange={e => onChange(e)}/>
                    <input name="last_name" type="text" aria-label="Last name" className="form-control" placeholder={"Last name"} onChange={e => onChange(e)}/>
                </div>
                <Select setRole={setRole} setCompany={setCompany} setExperience={setExperience}></Select>
                <ReactPhoneInput
                    value={formData["phone"]}
                    onChange={phone => setPhone(phone)}
                    component={TextField}
                />
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {signup})(Signup);