import React, { useState } from "react";
import PropTypes from "prop-types";


export default function CardTable({ color, users, setUsers }) {

  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  // if (users.length === 0) {
  //   return <div>No users found.</div>;
  // }
  // const handleButtonClick = async (userId) => {
  //   try {
  //     // Start loading state
  //     setLoading((prevState) => ({ ...prevState, [userId]: true }));
  //     setError(null);
  //
  //     // Make the API request
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}resend-otp`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: userId }),
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(`Server responded with status: ${response.status}`);
  //     }
  //
  //     const data = await response.json();
  //
  //     if (!data || data.error) {
  //       throw new Error(data?.error || 'Unexpected response from the server');
  //     }
  //
  //     alert('Barcode Generated!');
  //   } catch (err) {
  //     setError('Please try again.');
  //   } finally {
  //     setLoading((prevState) => ({ ...prevState, [userId]: false }));
  //   }
  // };


  const deleteUser = async (userId) => {
    try {
      // Start loading state
      setLoading((prevState) => ({ ...prevState, [userId]: true }));
      setError(null);

      // Make the API request to delete the user
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.error) {
        throw new Error(data?.error || 'Unexpected response from the server');
      }

      // Remove the deleted user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      alert('User deleted successfully!');
    } catch (err) {
      setError('Failed to delete the user. Please try again.');
    } finally {
      setLoading((prevState) => ({ ...prevState, [userId]: false }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                All Users
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                  className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
              >
                Name
              </th>
              <th
                  className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
              >
                Email
              </th>
              <th
                  className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
              >
                Barcode
              </th>
              <th
                  className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
              >Created at
              </th>
              <th
                  className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
              >Action</th>
            </tr>
            </thead>
            <tbody>
            {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
            ) : (
            users.map((user) => (
                <tr key={user.id}>
                  <th className="px-6 py-4 text-xs text-left flex items-center">
                    <span className={"ml-3 font-bold " + (color === "light" ? "text-blueGray-600" : "text-white")}>
                      {user.username}
                    </span>
                  </th>
                  <td className="px-6 py-4 text-xs">{user.email}</td>
                  <td className="px-6 py-4 text-xs">{user.otps[0]?.Otp}</td>
                  <td className="px-6 py-4 text-xs">{formatDate(user.createdAt)}</td>
                  <td className="px-6 py-4 text-xs">
                    <button
                        onClick={() => deleteUser(user.id)}  // Trigger delete function
                        className={`text-center w-full text-left py-2 px-4 text-white ${
                            loading[user.id] ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
                        disabled={loading[user.id]}
                    >
                      {loading[user.id] ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
            ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  users: PropTypes.array.isRequired, // Expected prop for users list
  setUsers: PropTypes.func.isRequired,
};
