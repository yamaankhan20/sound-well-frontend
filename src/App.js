import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Dashboard from "./dashboard/index";
import AllUsers from "./dashboard/all-users";
import Header from "./dashboard/components/header";
import Sidebar from "./dashboard/components/SideBar";
import Footer from "./dashboard/components/Footer";

function App() {

    return (
        <Router>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<AllUsers />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
