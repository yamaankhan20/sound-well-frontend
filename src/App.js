import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React,{useEffect} from "react";
import Dashboard from "./dashboard/index";
import AllUsers from "./dashboard/all-users";
import LoginFrom from "./dashboard/login";
import Header from "./dashboard/components/header";
import Sidebar from "./dashboard/components/SideBar";
import Footer from "./dashboard/components/Footer";

function App() {

    const loadCSS = (href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    };

    const loadJS = (src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => console.log(`${src} loaded`);
        document.body.appendChild(script);
    };

    // useEffect(() => {
    //     const cssFiles = [
    //         "./assets/css/font-awesome.css",
    //         "./assets/css/vendors/icofont.css",
    //         "./assets/css/vendors/themify.css",
    //         "./assets/css/vendors/flag-icon.css",
    //         "./assets/css/vendors/feather-icon.css",
    //         "./assets/css/vendors/slick.css",
    //         "./assets/css/vendors/slick-theme.css",
    //         "./assets/css/vendors/scrollbar.css",
    //         "./assets/css/vendors/animate.css",
    //         "./assets/css/vendors/datatables.css",
    //         "./assets/css/vendors/date-range-picker/flatpickr.min.css",
    //         "./assets/css/vendors/bootstrap.css",
    //         "./assets/css/style.css",
    //         "./assets/css/color-1.css",
    //         "./assets/css/responsive.css",
    //     ];
    //
    //     const jsFiles = [
    //         "./assets/js/jquery.min.js",
    //         "./assets/js/bootstrap/bootstrap.bundle.min.js",
    //         "./assets/js/script.js",
    //         "./assets/js/icons/feather-icon/feather.min.js",
    //         "./assets/js/icons/feather-icon/feather-icon.js",
    //         "./assets/js/scrollbar/simplebar.js",
    //         "./assets/js/scrollbar/custom.js",
    //         "./assets/js/config.js",
    //         "./assets/js/sidebar-menu.js",
    //         "./assets/js/sidebar-pin.js",
    //         "./assets/js/slick/slick.min.js",
    //         "./assets/js/slick/slick.js",
    //         "./assets/js/header-slick.js",
    //         "./assets/js/notify/bootstrap-notify.min.js",
    //         "./assets/js/datatable/datatables/jquery.dataTables.min.js",
    //         "./assets/js/datatable/datatables/datatable.custom.js",
    //         "./assets/js/datatable/datatables/datatable.custom1.js",
    //         "./assets/js/datepicker/date-range-picker/moment.min.js",
    //         "./assets/js/datepicker/date-range-picker/datepicker-range-custom.js",
    //         "./assets/js/typeahead/handlebars.js",
    //         "./assets/js/typeahead/typeahead.bundle.js",
    //         "./assets/js/typeahead/typeahead.custom.js",
    //         "./assets/js/typeahead-search/handlebars.js",
    //         "./assets/js/typeahead-search/typeahead-custom.js",
    //         "./assets/js/height-equal.js",
    //         "./assets/js/animation/wow/wow.min.js",
    //     ];
    //
    //     // Load CSS files
    //     cssFiles.forEach(loadCSS);
    //
    //     // Load JS files after DOMContentLoaded
    //     const loadAllScripts = () => {
    //         jsFiles.forEach(loadJS);
    //     };
    //
    //     document.addEventListener("DOMContentLoaded", loadAllScripts);
    //     return () => {
    //         document.removeEventListener("DOMContentLoaded", loadAllScripts);
    //     };
    // }, []);

    return (
        <Router>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<AllUsers />} />
                        <Route path="/login" element={<LoginFrom />} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
