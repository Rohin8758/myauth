import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            existingUsers.push(formData);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            console.log('Form submitted successfully', formData);
            navigate('/home');
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
                <button className="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
