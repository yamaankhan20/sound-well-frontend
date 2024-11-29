import React, {useEffect, useState} from "react";
import  Router,{ useRouter } from "next/router";



import Auth from "layouts/Auth.js";

export default function Login() {
    const router = useRouter();
    const { token } = router.query;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [buttonText, setButtonText] = useState("Set New Password");

    useEffect(()=> {
        const autherize_token= localStorage.getItem("AuthToken");

        if(autherize_token){
            Router.replace('/');
        }
    },[]);

    const handleReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setSuccess('');
            return;
        }

        setButtonText("Processing...");
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error_message || 'Something went wrong.');
            }

            const data = await response.json();
            setSuccess(data.message);
            setError('');
            setButtonText("Password Updated");
        } catch (err) {
            setError(err.error_message ||'Invalid or expired token.');
            setSuccess('');
            setButtonText("Set New Password");
        }
    };


    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-3">
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-6 pt-0">

                                <form onSubmit={handleReset}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Enter New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{width: '100%', margin: '0.5rem 0'}}
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={{ width: '100%', margin: '0.5rem 0' }}
                                        />
                                    </div>
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type='submit' disabled={buttonText === "Processing..."}>
                                            {buttonText}
                                        </button>
                                    </div>
                                </form>
                                {error && (
                                    <p className="text-red-500 text-center mb-3">{error}</p>
                                )}
                                {success && (
                                    <p className="text-green-700 text-center mb-3">{success}</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = Auth;
