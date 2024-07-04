"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SfButton, SfIconEmail, SfIconPerson, SfIconVisibility, SfInput } from "@storefront-ui/react";
import Link from "next/link";
import styles from "./register.module.css"

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);

    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            setEmailIsInvalid(false);
        }
        if (name === "password") {
            setPasswordIsInvalid(false);
            setConfirmPasswordIsInvalid(false);
        }
        if (name === "confirmPassword") {
            setConfirmPasswordIsInvalid(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setConfirmPasswordIsInvalid(true);
            return;
        }

        try {
            const response = await fetch("/api/register/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                router.push('/login');
            } else {
                console.log("Registration Failed");
                alert("Something went wrong! Please try again.");
            }
        } catch (error) {
            console.log("Registration Failed");
            alert("Something went wrong! Please try again.");
            console.error(error);
        }
    };

    const handleReset = () => {
        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setEmailIsInvalid(false);
        setPasswordIsInvalid(false);
        setConfirmPasswordIsInvalid(false);
    };

    return (
        <div className={styles.registerMainContainer}>
            <div className={`px-4 ${styles.formContainer}`}>
                <h1 className="mb-4 typography-headline-4 font-bold text-3xl">Get Started Now</h1>
                <form onSubmit={handleSubmit} className={styles.inputForm}>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">FirstName *</span>
                        <SfInput
                            value={formData.firstname}
                            name="firstname"
                            type="text"
                            required
                            slotPrefix={<SfIconPerson />}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">LastName *</span>
                        <SfInput
                            value={formData.lastname}
                            type="text"
                            name="lastname"
                            required
                            slotPrefix={<SfIconPerson />}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">Email *</span>
                        <SfInput
                            value={formData.email}
                            type="email"
                            name="email"
                            required
                            invalid={emailIsInvalid}
                            slotPrefix={<SfIconEmail />}
                            onInput={() => setEmailIsInvalid(!formData.email)}
                            onBlur={() => setEmailIsInvalid(!formData.email)}
                            onChange={handleChange}
                        />
                        {emailIsInvalid && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be empty</p>
                        )}
                    </label>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">Password *</span>
                        <SfInput
                            value={formData.password}
                            type="password"
                            name="password"
                            required
                            slotPrefix={<SfIconVisibility />}
                            onInput={() => setPasswordIsInvalid(!formData.password)}
                            onBlur={() => setPasswordIsInvalid(!formData.password)}
                            onChange={handleChange}
                        />
                        {passwordIsInvalid && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be empty</p>
                        )}
                    </label>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">Confirm Password *</span>
                        <SfInput
                            value={formData.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            required
                            slotPrefix={<SfIconVisibility />}
                            onInput={() => setConfirmPasswordIsInvalid(!formData.confirmPassword)}
                            onBlur={() => setConfirmPasswordIsInvalid(!formData.confirmPassword)}
                            onChange={handleChange}
                        />
                        {confirmPasswordIsInvalid && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">Passwords do not match</p>
                        )}
                    </label>
                    <p className="text-neutral-500 typography-text-sm mt-8">* marked fields are required</p>
                    <div className="flex gap-x-4 md:justify-end mt-6">
                        <SfButton type="button" onClick={handleReset} variant="secondary" className="flex-grow md:flex-grow-0">
                            Clear all
                        </SfButton>
                        <SfButton type="submit" className="flex-grow md:flex-grow-0">
                            Submit
                        </SfButton>
                    </div>

                    <hr />
                    <div  className={styles.signInContainer}>
                        <p className="text-neutral-500 typography-text-sm mt-8">
                            Already have an Account?{" "}
                            <Link href="/pages/login">
                                <span className={styles.linkToSignIn}>
                                    Sign In
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <div className={styles.imageContainer}></div>
        </div>
    );
};

export default RegisterForm;
