import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import Router from "next/router";

export default function RegisterUser() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [buttonText, setButtonText] = useState("Create Account");

    useEffect(() => {
        const autherize_token = localStorage.getItem("AuthToken");

        if (!autherize_token) {
            Router.replace('/auth/login');
        } else {
            console.log(autherize_token)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonText("Creating...");

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response )=>{
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        setError(errorData.error_message || "An error occurred.");
                        setButtonText("Create Account");
                        throw new Error(errorData.error_message || "An error occurred.");
                    });
                }
                return response.json();
            })
            .then((data)=>{
                console.log(data)
                if (data && data.message) {
                    setButtonText("Create Account");
                    setSuccess(data.message);
                    Router.replace("/admin/dashboard");
                    setError("");
                } else {
                    setButtonText("Create Account");
                }
            })
            .catch((error) => {
                setError(error.message || "Failed to register. Please try again.");
                setButtonText("Create Account");
            });
    }

    return (
        <>
            <div className="flex flex-wrap mt-4 max-w-4xl">
                <div className="w-full mb-12 px-4">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-10 rounded bg-white relative">
                        <form onSubmit={handleSubmit}>
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {success &&
                                <p style={{color: 'green', textAlign: 'center'}} className=" text-center">{success}</p>}
                            <div className="text-center mt-6">
                                <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

RegisterUser.layout = Admin;
