import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";  // Corrected import

export default function EditUser() {
    const router = useRouter();
    const { id } = router.query; // Extracting user ID from URL

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    const [error, setError] = useState("");  // For displaying error messages
    const [success, setSuccess] = useState("");  // For displaying success messages
    const [buttonText, setButtonText] = useState("Update User");

    useEffect(() => {
        const autherize_token = localStorage.getItem("AuthToken");

        if (!autherize_token) {
            router.replace('/auth/login');  // Redirect to login if no token is found
        }
    }, []);

    // Fetch the user data when the component mounts
    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}get-user/${id}`)
                .then((res) => res.json())
                .then((data) => setFormData(data.data))
                .catch((err) => setError("Failed to fetch user data"));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Updating...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}edit-user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setSuccess("User updated successfully!");
            setError("");
            router.push("/");
        } else {
            const errorData = await response.json();
            setError(errorData.error_message || "Failed to update user");
            setSuccess("");
        }
        setButtonText("Update User");
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
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="First Name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Last Name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    disabled={true} // Email is disabled and cannot be edited
                                />
                            </div>

                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {success && <p style={{ color: 'green', textAlign: 'center' }} className="text-center">{success}</p>}

                            <div className="text-center mt-6">
                                <button
                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    {buttonText}  {/* Dynamic button text */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

EditUser.layout = Admin;
