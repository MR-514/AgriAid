"use client";

import { useState } from 'react';
import {
    SfButton,
    SfInput,
    SfIconEmail,
    SfIconVisibility,
} from '@storefront-ui/react';

import styles from "./login.module.css"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FormFields() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const router = useRouter()

    const sendForm = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            setEmailIsInvalid(true);
        }
        if (!password) {
            setPasswordIsInvalid(true);
        }
        if (email && password) {
            const userData = {
                email,
                password,
            };
            console.log(userData);
            // Here you can send userData to the server

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const result = await response.json();
                // store customer id here
                localStorage.setItem("customerId", result.customerId)
                router.push('/')
            } catch (error) {
                console.error('Error submitting form:', error);
                // setResponseMessage('Failed to submit form');
            }



        }
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setEmailIsInvalid(false);
        setPasswordIsInvalid(false);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}></div>
            <div className="px-4">
                <h1 className="mb-4 typography-headline-4 font-bold text-3xl">Login to Continue</h1>
                <form onSubmit={sendForm}>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">Email *</span>
                        <SfInput
                            value={email}
                            type="email"
                            required
                            invalid={emailIsInvalid}
                            slotPrefix={<SfIconEmail />}
                            onInput={() => setEmailIsInvalid(!email)}
                            onBlur={() => setEmailIsInvalid(!email)}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {emailIsInvalid && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be empty</p>
                        )}
                    </label>
                    <label className="block my-4">
                        <span className="typography-label-sm font-medium">Password *</span>
                        <SfInput
                            value={password}
                            type="password"
                            required
                            slotPrefix={<SfIconVisibility />}
                            onInput={() => setPasswordIsInvalid(!password)}
                            onBlur={() => setPasswordIsInvalid(!password)}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {passwordIsInvalid && (
                            <p className="mt-0.5 text-negative-700 typography-text-sm font-medium">The field cannot be empty</p>
                        )}
                    </label>
                    <p className="text-neutral-500 typography-text-sm mt-8">* marked fields are required</p>
                    <div className={`flex gap-x-4 md:justify-end mt-6 ${styles.buttonContainer}`}>
                        <SfButton onClick={handleReset} variant="secondary" className="flex-grow md:flex-grow-0">
                            Clear all
                        </SfButton>
                        <SfButton type="submit" className="flex-grow md:flex-grow-0">
                            Submit
                        </SfButton>
                    </div>

                    <hr />
                    <div className={styles.signupContainer}>
                        <p className="text-neutral-500 typography-text-sm mt-8">
                            Want to Create an Account?
                            <Link className={styles.linkToSignup} href="/pages/register">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
