import "./App.css";
import { Route, Link, Routes, Navigate, HashRouter, } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import React, { useState } from "react";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");

  const logOut = (e) => {

    e.preventDefault()
    axios
      .post("https://akademia108.pl/api/social-app/user/logout")
      .then((res) => {
        console.log(res.data);
        setUser(null)
        localStorage.setItem('user', null)
      })
      .catch((err) => {
        console.log('error', err.data)
      });
  }

  return (

    <div className="App">
      <div className="Main-nav">
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user &&
            <li>
              <Link to="/Login">Login</Link>
            </li>}
          {!user && <li>
            <Link to="/SignUp">SignUp</Link>
          </li>}
          {user && <li onClick={logOut}>
            <Link to='/'>Logout</Link>
          </li>}
        </nav>
      </div>
        <Routes>
          <Route path="/" element={<Home setUser={setUser} user={user} />} />
          <Route path="/Login" element={<Login setUser={setUser} user={user} />} />
          <Route path="/SignUp" element={<SignUp user={user} />} />
        </Routes>
    </div>
  );
}

export default App;
