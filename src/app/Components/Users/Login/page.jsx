"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const route = useRouter();

  let [user, setuser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    // console.log(e.target.name)
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/users/Login",
      headers: {
        "Content-Type": "application/json"
      },
      data: user
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        localStorage.setItem("user_id", response.data.data._id);
        route.push("/Components/Blogs/MyBlogs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-80 bg-white shadow-md rounded-lg h-auto">
      <h1 className="text-3xl font-bold text-center my-4 text-teal-950">LOGIN</h1>
        <Input
          handleChange={handleChange}
          type="email"
          placeholder={"Enter Email"}
          value={user.email}
          name="email"
        />
        <Input
          handleChange={handleChange}
          type="password"
          placeholder={"Enter Password"}
          value={user.password}
          name="password"
        />

        <button className="p-2 mt-6 mx-4 text-center bg-teal-950 w-72 text-white rounded-sm" onClick={() => submit()}>
          Login
        </button>
        <p className="text-center my-4 text-slate-600">Don't Have an Account?
            <Link href="/Components/Users/Signup" className="text-teal-950 font-bold"> SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export const Input = ({ type, placeholder, value, name, handleChange }) => {
  return (
    <input
      className="p-2 border border-slate-200 w-72 mx-4 my-2"
      value={value}
      onChange={(e) => handleChange(e)}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Login;
