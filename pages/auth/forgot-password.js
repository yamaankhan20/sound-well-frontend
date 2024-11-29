import React, {useEffect, useState} from "react";
import Router from "next/router";



import Auth from "layouts/Auth.js";

export default function Login() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState("Send Reset Link");

    useEffect(()=>{
        const autherize_token= localStorage.getItem("AuthToken");

        if(autherize_token){
            Router.replace('/admin/dashboard');
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending Reset Link...");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setButtonText("Link Sent!");
                e.preventDefault();
            } else {
                setMessage(data.error_message);
                setButtonText("Send Reset Link");
            }
        } catch (error) {
            console.log(error)
            setMessage('Error occurred. Please try again.');
            setButtonText("Send Reset Link");
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
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Forgot Password</small>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {message && <p className={'text-center'}>{message}</p>}
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type='submit' >
                                            {buttonText}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = Auth;
