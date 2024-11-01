import React from 'react';

const Dashboard = () => {
    return(
        <>
            <div className="page-body">
                    <div className="container-fluid default-dashboard">
                        <div className="row widget-grid">
                            <div className="col-xl-5 col-md-6 proorder-xl-1 proorder-md-1">
                                <div className="card profile-greeting p-0">
                                    <div className="card-body">
                                        <div className="img-overlay">
                                            <h1>Good day, Lena Miller</h1>
                                            <p>Welcome to the Mofi family! We are delighted that you have visited our dashboard.</p><a className="btn" href="#!">Go Premium</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </>
    )
}

export default Dashboard;