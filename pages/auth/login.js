import React, {useEffect, useState} from "react";
import Router from "next/router";

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonText, setButtonText] = useState("Login");


  useEffect(()=>{
    const autherize_token= localStorage.getItem("AuthToken");

    if(autherize_token){
      Router.replace('/admin/dashboard');
    }
  },[]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Signing in...");

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              setError(errorData.error_message || "An error occurred.");
              setButtonText("Login");
              throw new Error(errorData.error_message || "An error occurred.");
            });
          }
          return response.json();
        })
        .then((data) => {

          if (data && data.message && data.token ) {
            if(data.role === "user"){
              setError("Failed to login. Please try again.");
              setButtonText("Login");
            }else if(data.role === "admin"){
              localStorage.setItem("AuthToken", data.token);
              console.log(localStorage.getItem("AuthToken"));
              Router.replace("/admin/dashboard");
              setSuccess(data.message);
            }
          } else {
            setButtonText("Login");
          }
        })
        .catch(() => {
          setError( "Failed to login. Please try again.");
          setButtonText("Login");
        });
  };



  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Sign in with credentials</small>
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {success && <p className="text-green-500 text-center">{success}</p>}
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type='submit'

                    >
                      {buttonText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <span
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
