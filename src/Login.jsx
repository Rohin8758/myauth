import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase-config";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    /* formvalidation for form */
    const formvalidation = () => {
        let temperror = {};
        if (email === "") {
            temperror.email = "Email is required";
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            temperror.email = "Email is invalid";
        }
        if (password === "") {
            temperror.password = "Password is required";
        }
        return temperror;
    };

    /* handle submit button function  */
    const handleLogin = (e) => {
        e.preventDefault();
        let validation = formvalidation();
        setError(validation);

        if (Object.keys(validation).length === 0) {
            const getUser = JSON.parse(localStorage.getItem('users')) || [];
            const findUser = getUser.find(user => user.email === email && user.password === password);

            if (findUser) {
                const getUserToken = JSON.parse(localStorage.getItem('users')) || [];
                const findToken = getUserToken.find(user => user.token);
                if (findToken) {
                    navigate("/home", { replace: true });
                } else {
                    window.alert("Token not found. Please sign up.");
                    navigate("/signup");
                }
            } else {
                window.alert("User not found. Please sign up.");
                navigate("/signup");
            }
        }
    };

    /* Authentication with the google  */
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const user = result.user;

            const userData = {
                email: user.email,
                token: token,
                name: user.displayName,
                photoURL: user.photoURL
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/home', { replace: true });

        } catch (error) {
            console.error("Error during Google sign-in: ", error);
        }
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    return (
        <>
            <div className='h-full flex justify-center pt-28 pb-32'>
                <form className="form" onSubmit={handleLogin}>
                    <p className="title">Login</p>
                    <p className="message">Login with your credentials or Google.</p>
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
                    <div className="flex flex-col items-center mt-4">
                        <button className="submit bg-blue-500 w-full text-white py-2 px-4 rounded">Submit</button>
                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            className="text-white py-2 px-4 rounded mb-2"
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <p className="signin">
                        <Link to="/signup">Click To <strong>Sign up</strong></Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
