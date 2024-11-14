import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import CardTable from "../../components/Cards/CardTable";
import Router from "next/router";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const autherize_token = localStorage.getItem("AuthToken");

        // If the token is not available, redirect to login
        if (!autherize_token) {
            Router.replace('/auth/login');
        } else {
            console.log(autherize_token)
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            console.log("Fetching users...");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}get-users`);
            const data = await response.json();
            if (response.ok) {
                setUsers(data.data);
            } else {
                // If the response isn't ok, set an error message
                throw new Error("Failed to fetch users");
            }
        } catch (error) {
            setError("Error fetching users, please try again.");
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    };
    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <CardTable users={users} setUsers={setUsers} />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = Admin;
