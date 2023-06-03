import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import {authCheckState, logout, update_user} from "../actions/auth";
import ReactPhoneInput from "react-phone-input-mui";

const Profile = ({authCheckState, update_user, isAuthenticated, user}) => {
    useEffect(() => {
        authCheckState();
    }, [])

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        skills: user.skills,
        experience: user.experience,
        company: user.company
    });

    const {
        first_name,
        last_name,
        role,
        phone,
        company,
        experience
    } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        try {
            update_user(
                first_name,
                last_name,
                role,
                phone,
                company,
                experience
            );
        }
        catch (e){
            console.log(e);
        }
    };

    const setPhone = (newPhone) => {
        setFormData({...formData, ["phone"]: newPhone});
    }

    if(!isAuthenticated){
        return(<Navigate to="/login"/>);
    }

    return (
        <div style={{textAlign:"center", width: "80%", margin: "10%"}}>
            <form onSubmit={e => onSubmit(e)}>
                <Grid container
                      spacing={2}
                      direction="column">
                    <Grid item >
                        <TextField fullWidth name="first_name" id="outlined-basic" label="First name" variant="outlined" defaultValue={`${user.first_name}`} onChange={e => onChange(e)}/>
                    </Grid>
                    <Grid item >
                        <TextField fullWidth name="last_name" id="outlined-basic" label="Last name" variant="outlined" defaultValue={`${user.last_name}`} onChange={e => onChange(e)}/>
                    </Grid>
                    <Grid item >
                        <TextField fullWidth name="email" id="outlined-basic" label="Email" variant="outlined" defaultValue={`${user.email}`} onChange={e => onChange(e)}/>
                    </Grid>
                    <Grid item >
                        <ReactPhoneInput
                            value={formData["phone"]}
                            onChange={phone => setPhone(phone)}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item >
                        <TextField fullWidth name="experience" id="outlined-basic" label="Experience" variant="outlined" defaultValue={`${user.experience}`} onChange={e => onChange(e)}/>
                    </Grid>
                    <Grid item >
                        <TextField fullWidth name="company" id="outlined-basic" label="Company name" variant="outlined" defaultValue={`${user.company}`} onChange={e => onChange(e)}/>
                    </Grid>
                </Grid>
                <button type="submit" className="btn btn-primary md-5">Update</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchProps = {
    authCheckState: authCheckState,
    logout: logout,
    update_user: update_user
}

export default connect(mapStateToProps, mapDispatchProps) (Profile);