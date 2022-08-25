import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default function Login(props) {

  const [formData, prevFormData] = useState({
    username: "",
    password: ""
  })

  const inputValueChange = e => {
    const target = e.target
    const name = target.name

    prevFormData(prevData => {
      return {
        ...prevData, [name]: target.value

      }
    })
  }

  const checkUser = (e) => {
    e.preventDefault()

    let loginData = {
      username: formData.username,
      password: formData.password
    };

    axios
      .post("https://akademia108.pl/api/social-app/user/login", loginData)
      .then((res) => {
        props.setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        console.log("response", res.data);
      })
      .catch((err) => {
        console.log('error', err.data);

      });
  }

  return (
    <div className="login">
      {props.user && <Navigate to='/' />}
      <form className="login-form" onSubmit={checkUser} >
        <input type="text" name="username" placeholder="Login" onChange={inputValueChange} />
        <input type="password" name="password" placeholder="Password" onChange={inputValueChange} />
        <input type="submit" value="Login" id="submitBTN"></input>
      </form>
    </div>
  );
}