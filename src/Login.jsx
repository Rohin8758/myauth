import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const formvalidation = () => {
        let temperror = {};
        if (email === "") {
            temperror.email = "email is required"
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            temperror.email = "email is invalid"
        }
        if (password === "") {
            temperror.password = "password is required"
        }
        return temperror;
    }

    const handlelogin = (e) => {
        e.preventDefault();
        let validation = formvalidation();
        setError(validation);
        const getuser = JSON.parse(localStorage.getItem('users')) || [];
        const finduser = getuser.find(user => user.email === email && user.password === password);

        if (finduser) {
            navigate("/home");

        } else {
            window.alert("user not Found")
        }
    }

    return (
        <>
            <div className='h-full flex justify-center pt-28 pb-32'>
                <form className="form" onSubmit={handlelogin}>
                    <p className="title">Login</p>
                    <p className="message">Signup now and get full access to our app. </p>
                    <label>
                        <input
                            className="input"
                            type="email"
                            placeholder=""
                            required=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
                        <span>Email</span>
                    </label>
                    <label>
                        <input
                            className="input"
                            type="password"
                            placeholder=""
                            required=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error.password && <p className='text-red-500 text-sm'>{error.password}</p>}
                        <span>Password</span>
                    </label>
                    <button className="submit">Submit</button>
                    <p className="signin">
                        <Link to="/signup">Click To <strong>Sign up</strong></Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login
