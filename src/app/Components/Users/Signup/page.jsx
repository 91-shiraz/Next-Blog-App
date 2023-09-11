"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
  const route = useRouter();
  let [user, setuser] = useState({
    email: "",
    password: "",
    name: "",
    number: ""
  });

  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/users/Signup",
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
        setuser({ email: "", password: "", name: "", number: "" });
        route.push("/Components/Users/Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-80 bg-white shadow-md rounded-lg h-auto">
        <h1 className="text-3xl font-bold text-center my-4 text-teal-950">
          SIGNUP
        </h1>
        <Input
          type="text"
          handleChange={handleChange}
          placeholder={"Enter Name"}
          value={user.name}
          name="name"
        />
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
        <Input
          handleChange={handleChange}
          type="number"
          placeholder={"Enter Number"}
          value={user.number}
          name="number"
        />
        <button
          className="p-2 mt-6 mx-4 text-center bg-teal-950 w-72 text-white rounded-sm"
          onClick={() => submit()}
        >
          Create Account
        </button>
        <p className="text-center my-4 text-slate-600">
          Already Have an Account?
          <Link
            href="/Components/Users/Signup"
            className="text-teal-950 font-bold"
          >
            Login
          </Link>
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

export default SignUp;
