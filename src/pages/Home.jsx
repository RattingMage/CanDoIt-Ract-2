import React from 'react';
import {connect} from "react-redux";
import ListVacancy from "./ListVacancy";
import {Link} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {authCheckState} from "../actions/auth";
import * as PropTypes from "prop-types";

class Home extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div>
                <ListVacancy/>
            </div>
        );
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.any,
    role: PropTypes.any,
    onTryAutoSignup: PropTypes.any
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const mapDispatchToProps = {
    onTryAutoSignup: authCheckState,
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);