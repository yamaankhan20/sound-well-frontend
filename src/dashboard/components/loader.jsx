import React from 'react';


const loader = () => {
    return (
        <>
            <div className="loader-wrapper">
                <div className="loader loader-1">
                    <div className="loader-outter"></div>
                    <div className="loader-inner"></div>
                    <div className="loader-inner-1"></div>
                </div>
            </div>
            <div className="tap-top"><i data-feather="chevrons-up"></i></div>
        </>
    )
}
export default loader;
