import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import Router from "next/router";

export default function RegisterUser() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [buttonText, setButtonText] = useState("Generate Otp");
    const [otp, setOtp] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setButtonText("Generating Otp...");

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((response )=>{
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        setError(errorData.error_message || "An error occurred.");
                        setButtonText("Generate Otp");
                        throw new Error(errorData.error_message || "An error occurred.");
                    });
                }
                return response.json();
            })
            .then((data)=>{
                if (data && data.message) {
                    setButtonText("Generate Otp");
                    setSuccess(data.message);
                    setOtp(data.otp);
                    setIsModalOpen(true);
                    setError("");
                    setEmail(' ');
                } else {
                    setButtonText("Generate Otp");
                }
            })
            .catch((error) => {
                setError(error.message || "Failed to register. Please try again.");
                setButtonText("Generate Otp");
            });
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(otp).then(() => {
            alert("OTP copied to clipboard!");
        }).catch((err) => {
            alert("Failed to copy OTP");
        });
    };

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
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h3>Your OTP: {otp}</h3>
                            <button className={"mt-5 text-center w-full text-left py-2 px-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"} onClick={copyToClipboard}>Copy OTP</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

RegisterUser.layout = Admin;
