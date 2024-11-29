import React, { useState } from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import Router from "next/router";


export default function CardTable({ color, users, setUsers }) {

  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const editUser = (id) => {
    Router.push(`/admin/user/edit/${id}`);
  };
  const deleteUser = async (userId) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

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

  const columns = [
    {
      name: 'First name',
      selector: row => row.first_name,
      sortable: true,
    },
    {
      name: 'Last name',
      selector: row => row.last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Barcode',
      selector: row => row.otps[0]?.Otp,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => formatDate(row.createdAt),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
          <div className="flex justify-center space-x-2">
            <button
                onClick={() => editUser(row.id)}  // Call edit function
                className={`mr-2 py-2 px-4 text-white ${loading[row.id] ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} rounded-md`}
            >
              Edit
            </button>
            <button
                onClick={() => deleteUser(row.id)}
                className={`py-2 px-4 text-white ${loading[row.id] ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} rounded-md`}
                disabled={loading[row.id]}
            >
              {loading[row.id] ? "Deleting..." : "Delete"}
            </button>
          </div>
      ),
    },
  ];
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    return (
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          <DataTable
              columns={columns}
              data={filteredUsers}  // Use filtered data here
              pagination
              highlightOnHover
              responsive
              persistTableHead
              subHeader
              subHeaderComponent={
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={handleSearch}  // Update state with the search term
                />
              }
          />
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
