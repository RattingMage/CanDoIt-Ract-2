import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {authCheckState, logout} from "../../../actions/auth";
import logo from "./logo.png";



const Navbar = ({ authCheckState, logout, isAuthenticated }) => {
    useEffect(() => {
        authCheckState();
    })

    const logout_user = () => {
      logout();
    };

    const guestLinks = () => (
        <Fragment>
            <li style={{listStyleType: "none"}}>
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li style={{listStyleType: "none"}}>
                <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li style={{listStyleType: "none"}}>
                <Link className='nav-link' to="/profile">Profile</Link>
            </li>
            <li style={{listStyleType: "none"}}>
                <Link className='nav-link' to="/home" onClick={logout_user}>Logout</Link>
            </li>
        </Fragment>
    );


    // return (
    //     <Fragment>
    //         <header id="header" className="header">
    //             <div style={{ margin: 0 }} className="container-fluid container-xl d-flex align-items-center justify-content-between">
    //
    //                 <Link className="logo d-flex align-items-center" to="/home">
    //                     <img src={logo} alt=""/>
    //                     <span>CanDoIt</span>
    //                 </Link>
    //
    //                 <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //                     <div className="container-fluid">
    //                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    //                             <span className="navbar-toggler-icon"></span>
    //                         </button>
    //                         <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
    //                             <ul className="navbar-nav">
    //                                 {isAuthenticated ? authLinks() : guestLinks()}
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </nav>
    //
    //         {/*        /!*<nav id="navbar" className="navbar">*!/*/}
    //         {/*        /!*    <div className="container-fluid">*!/*/}
    //         {/*        /!*        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"*!/*/}
    //         {/*        /!*                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"*!/*/}
    //         {/*        /!*                aria-label="Toggle navigation">*!/*/}
    //         {/*        /!*            <span className="navbar-toggler-icon"></span>*!/*/}
    //         {/*        /!*        </button>*!/*/}
    //         {/*        /!*        <div className="collapse navbar-collapse" id="navbarNav">*!/*/}
    //         {/*        /!*            <ul className="navbar-nav">*!/*/}
    //         {/*        /!*                {isAuthenticated ? authLinks() : guestLinks()}*!/*/}
    //         {/*        /!*            </ul>*!/*/}
    //         {/*        /!*        </div>*!/*/}
    //         {/*        /!*    </div>*!/*/}
    //
    //         {/*        /!*    /!*<i className="bi bi-list mobile-nav-toggle"></i>*!/*!/*/}
    //         {/*        /!*</nav>*!/*/}
    //
    //             </div>
    //         </header>
    //     </Fragment>
    // );

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <header id="header" className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <Link className="logo d-flex align-items-center" to="/home">
                    <img src={logo} alt=""/>
                    <span>CanDoIt</span>
                </Link>
                <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    {isAuthenticated ? authLinks() : guestLinks()}
                </div>
            </nav>
        </header>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchProps = {
    authCheckState: authCheckState,
    logout: logout
}

export default connect(mapStateToProps, mapDispatchProps)(Navbar);