import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase-config";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User signed in: ", user);
            navigate('/home');
        } catch (error) {
            console.error("Error during Google sign-in: ", error);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstname) { tempErrors.firstname = "Firstname is required"; }
        if (!formData.lastname) { tempErrors.lastname = "Lastname is required"; }
        if (!formData.email) { tempErrors.email = "Email is required"; }
        if (!/\S+@\S+\.\S+/.test(formData.email)) { tempErrors.email = "Email is invalid"; }
        if (!formData.password) { tempErrors.password = "Password is required"; }
        if (formData.password.length < 6) { tempErrors.password = "Password must be at least 6 characters"; }
        if (formData.password !== formData.confirmPassword) { tempErrors.confirmPassword = "Passwords do not match"; }
        return tempErrors;
    };

    const generateToken = () => {
        return Math.random().toString(36).substr(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const token = generateToken();
            const userData = {
                ...formData,
                token
            };
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            existingUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            console.log('Form submitted successfully', userData);
            navigate('/home',  { replace: true });

        }
    };

    return (
        <div className='h-full flex justify-center pt-28 pb-32'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <div className="flex">
                    <label>
                        <input className="input" type="text" name="firstname" placeholder="" value={formData.firstname} onChange={handleChange} />
                        <span>Firstname</span>
                        {errors.firstname && <p className="error text-red-500">{errors.firstname}</p>}
                    </label>
                    <label>
                        <input className="input" type="text" name="lastname" placeholder="" value={formData.lastname} onChange={handleChange} />
                        <span>Lastname</span>
                        {errors.lastname && <p className="error text-red-500">{errors.lastname}</p>}
                    </label>
                </div>
                <label>
                    <input className="input" type="email" name="email" placeholder="" value={formData.email} onChange={handleChange} />
                    <span>Email</span>
                    {errors.email && <p className="error text-red-500">{errors.email}</p>}
                </label>
                <label>
                    <input className="input" type="password" name="password" placeholder="" value={formData.password} onChange={handleChange} />
                    <span>Password</span>
                    {errors.password && <p className="error text-red-500">{errors.password}</p>}
                </label>
                <label>
                    <input className="input" type="password" name="confirmPassword" placeholder="" value={formData.confirmPassword} onChange={handleChange} />
                    <span>Confirm password</span>
                    {errors.confirmPassword && <p className="error text-red-500">{errors.confirmPassword}</p>}
                </label>
                <div className="flex flex-col items-center mt-4">
                    <button className="submit bg-blue-500 text-white py-2 px-4 rounded w-full">Submit</button>
                    <button
                        type="button"
                        onClick={signInWithGoogle}
                        className="text-white py-2 px-4 rounded mb-2 hover:text-blue-500"
                    >
                        Sign in with Google
                    </button>
                    <p className="signin">
                        <Link to="/">Click To <strong>Login</strong></Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
