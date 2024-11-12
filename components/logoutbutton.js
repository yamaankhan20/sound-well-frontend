import Router from "next/router";

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem("AuthToken");
        Router.replace("/auth/login");
    };

    return <button
        className="w-full text-left py-2 px-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
