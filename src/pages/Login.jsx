import React, {useState} from 'react';
import {login} from "../actions/auth";
import {connect} from "react-redux";
import {Link, Navigate, redirect} from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        login(email, password);
        e.preventDefault();
    };

    if (isAuthenticated) {
        return (
            <Navigate to="/home"/>
        );
    }

    return (
        <div style={{ margin: "50px" }}>
            <form onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input name="email" type="email" value={email} className="form-control" id="exampleFormControlInput1" onChange={e => onChange(e)} placeholder="name@example.com"/>
                </div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input  name='password' value={password} onChange={e => onChange(e)} type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" placeholder={"Password"}/>
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                        spaces, special characters, or emoji.
                    </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);