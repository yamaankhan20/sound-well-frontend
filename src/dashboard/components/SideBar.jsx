import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ArrowLeft } from "react-feather";
import {NavLink} from 'react-router-dom';
const SideBar = () => {
    const [isPinnedVisible, setIsPinnedVisible] = useState(false);

    const togglePinnedTitle = () => {
        setIsPinnedVisible(!isPinnedVisible);
    };

    return (
        <div className="sidebar-wrapper" data-layout="stroke-svg">
            <div>
                <div className="logo-wrapper">
                    <NavLink to="/">
                        <img className="img-fluid" src="./assets/images/soundIcon.jpeg" alt=""/>
                    </NavLink>
                    <div className="back-btn">
                        <FaAngleLeft/>
                    </div>
                    <div className="toggle-sidebar">
                        <svg className="stroke-icon sidebar-toggle status_toggle middle">
                            <use href="./assets/svg/icon-sprite.svg#toggle-icon"></use>
                        </svg>
                        <svg className="fill-icon sidebar-toggle status_toggle middle">
                            <use href="./assets/svg/icon-sprite.svg#fill-toggle-icon"></use>
                        </svg>
                    </div>
                </div>

                <div className="logo-icon-wrapper">
                    <NavLink to="/">
                        S W
                    </NavLink>
                </div>

                <nav className="sidebar-main">
                    <div className="left-arrow" id="left-arrow">
                        <ArrowLeft data-feather="arrow-left"/>
                    </div>
                    <div id="sidebar-menu">
                        <ul className="sidebar-links" id="simple-bar">
                            <li className="back-btn">
                                <NavLink to="/">
                                    <img className="img-fluid" src="./assets/images/logo/logo-icon.png" alt=""/>
                                </NavLink>
                                <div className="mobile-back text-end">
                                    <span>Back</span>
                                    <FaAngleRight className="ps-2" aria-hidden="true"/>
                                </div>
                            </li>

                            <li className='pin-title sidebar-main-title '>
                                <div>
                                    <h6>Pinned</h6>
                                </div>
                            </li>

                            <li className="sidebar-main-title">
                                <div>
                                    <h6 className="lan-1">General</h6>
                                </div>
                            </li>

                            <li className="sidebar-list" onClick={togglePinnedTitle}>
                                <i className="fa fa-thumb-tack"></i>
                                <NavLink to='/' className="sidebar-link sidebar-title" onClick={(e) => e.preventDefault()}>
                                    <svg className="stroke-icon">
                                        <use href="./assets/svg/icon-sprite.svg#stroke-home"></use>
                                    </svg>
                                    <svg className="fill-icon">
                                        <use href="./assets/svg/icon-sprite.svg#fill-home"></use>
                                    </svg>
                                    <span className="lan-3">Dashboard</span>
                                </NavLink>
                                <ul className="sidebar-submenu">
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/users">All Users</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default SideBar;