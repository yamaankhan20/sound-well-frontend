import React from 'react';




const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="col-md-12 footer-copyright d-flex flex-wrap align-items-center justify-content-between">
                        <p className="mb-0 f-w-600">Copyright {date} © Sound Well </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;