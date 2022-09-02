import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = (props) => {

    const [formData, prevFormData] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
    })

    const inputValueChange = e => {
        const target = e.target
        const name = target.name

        prevFormData({
            ...formData,
            [name]: target.value
        })
    }

    const [signUpMessage, setSignUpMessage] = useState("");
    const [signUpDone, setSignUpDone] = useState(false);

    const validate = () => {
        let validationErrors = {
            username: false,
            password: false,
            email: false,
            confirmPassword: false,
        };

        // USERNAME
        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: "Username should have at least 4 characters" }
            })
        }
        else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    username: "Username should'n have empty characters"
                }
            })
        }
        else {
            validationErrors.username = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    username: ""
                }
            })
        }

        // Email

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    email: "There is no valid email"
                };
            });
        }

        else {
            validationErrors.email = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    email: ""
                }
            })
        }

        // Password

        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    password: "Password should have at least 6 characters"
                }
            })
        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    password: "Password should have at least 6 characters"
                }
            })
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    password: "Password must contain one of charts: ! @ # $ "
                };
            })
        } else {
            validationErrors.password = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    password: ""
                }
            })
        }

        // confirm Password
        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    confirmPassword: "Password should be the same"
                };
            });
        } else {
            validationErrors.confirmPassword = false;
            setErrors(prevErrors => {
                return {
                    ...prevErrors,
                    confirmPassword: ""
                };
            });
        }

        return (
            !validationErrors.username &&
            !validationErrors.email &&
            !validationErrors.password &&
            !validationErrors.confirmPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let loginData = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
        };

        axios
            .post("https://akademia108.pl/api/social-app/user/signup", loginData)
            .then((res) => {
                console.log(res.data)

                let resData = res.data;

                if (resData.signedup) {
                    setSignUpMessage('Account Created')
                    setSignUpDone(true)
                }
                else {
                    if (resData.message.username) {
                        setSignUpMessage(resData.message.username[0])
                    }
                    else if (resData.message.email) {
                        setSignUpMessage(resData.message.email[0])
                    }
                }
            })
            .catch((err) => {
                console.log('error', err.data);

            });

        if (!validate()) {
            return
        }

        console.log('wysylam')
    }


    return (
        <div className="signup">
            {props.user && <Navigate to="/" />}
            <form className="signup-form" onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <input type="text"
                    name="username"
                    placeholder="User Name"
                    onChange={inputValueChange}
                />
                {errors.username && <p>{errors.username}</p>}
                <input type="e-mail"
                    name="email"
                    placeholder="E-mail"
                    onChange={inputValueChange}
                />
                {errors.email && <p>{errors.email}</p>}
                <input type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputValueChange}
                />
                {errors.password && <p>{errors.password}</p>}
                <input type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={inputValueChange}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                <button className="signupBtn" disabled={signUpDone} onChange={inputValueChange} >Sign Up</button>

                {signUpDone && (
                    <div>
                        <Link to='/Login' className="signupBtnLog"> Go to login </Link>
                    </div>
                )
                }

            </form >
        </div >
    );
}


export default SignUp