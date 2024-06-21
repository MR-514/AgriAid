"use client"
import React, { useState } from "react";

import "./register.css"
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter()
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("Form data:", formData);
        try {
            const response = await fetch(
                "/api/register", {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });
            // Adjust the URL when success
            if (response.status === 200) {
                // redirect to login
                router.push('/pages/login')
            } else {
                console.log("Registration Failed");
                alert("Something went wrong! Please try again.");
            }
            console.log(response);
        } catch (error) {
            console.log("Registration Failed");
            alert("Something went wrong! Please try again.");
            console.error(error);
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=" "
                            type="text"
                            className="input"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                        <span>Firstname</span>
                    </label>
                    <label>
                        <input
                            required
                            placeholder=" "
                            type="text"
                            className="input"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                        <span>Lastname</span>
                    </label>
                </div>
                <label>
                    <input
                        required
                        placeholder=" "
                        type="email"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span>Email</span>
                </label>
                <label>
                    <input
                        required
                        placeholder=" "
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span>Password</span>
                </label>
                <label>
                    <input
                        required
                        placeholder=" "
                        type="password"
                        className="input"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <span>Confirm password</span>
                </label>
                <button type="submit" className="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an account? <a href="/pages/login">Sign in</a>
                </p>
            </form>
        </>
    );
};

export default RegisterForm;
