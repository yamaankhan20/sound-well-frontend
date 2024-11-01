import React from 'react';
import {NavLink} from 'react-router-dom';
// import {Col, Row, Container} from "react-bootstrap";
const Header = () => {
    return(
        <div className="page-header row">
            <div className="header-logo-wrapper col-auto">
                <div className="logo-wrapper">
                    <NavLink to="/">
                        <img className="img-fluid for-light" src="./assets/images/soundIcon.jpeg" alt=""/>
                        <img className="img-fluid for-dark" src="./assets/images/soundIcon.jpeg" alt=""/>
                    </NavLink>
                </div>
            </div>
            <div className="col-4 col-xl-4 page-title">
                <h4 className="f-w-700">Default dashboard</h4>
                <nav>
                    <ol className="breadcrumb justify-content-sm-start align-items-center mb-0">
                        <li className="breadcrumb-item"><NavLink to="/"> <i data-feather="home"> </i></NavLink></li>
                        <li className="breadcrumb-item f-w-400">Dashboard</li>
                        <li className="breadcrumb-item f-w-400 active">Default</li>
                    </ol>
                </nav>
            </div>
            <div className="header-wrapper col m-0">
                <div className="row">
                    <div className="header-logo-wrapper col-auto p-0">
                        <div className="logo-wrapper"><a href="#!"><img className="img-fluid" src="./assets/images/soundIcon.jpeg" alt=""/></a></div>
                        <div className="toggle-sidebar">
                            <svg className="stroke-icon sidebar-toggle status_toggle middle">
                                <use href="../assets/svg/icon-sprite.svg#toggle-icon"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="nav-right col-xxl-8 col-xl-6 col-md-7 col-8 pull-right right-header p-0 ms-auto">
                        <ul className="nav-menus">

                            <li className="profile-nav onhover-dropdown px-0 py-0">
                                <div className="d-flex profile-media align-items-center"><img className="img-30" src="./assets/images/dashboard/profile.png" alt=""/>
                                    <div className="flex-grow-1"><span>Alen Miller</span>
                                        <p className="mb-0 font-outfit">UI Designer<i className="fa fa-angle-down"></i></p>
                                    </div>
                                </div>
                                <ul className="profile-dropdown onhover-show-div">
                                    <li><a href="#!"><i data-feather="log-in"> </i><span>Log in</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;