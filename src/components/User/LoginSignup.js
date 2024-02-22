import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../redux/Action/UserAction';
import Loader from '../layout/Loader/Loader';
import './LoginSignup.css'

const LoginSignup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const toggleForm = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { loading, verifyUserAuthenticate, error } = useSelector((state) => state.user);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password
        };
        try {
            if (isLogin) {
                dispatch(login(email, password));
            } else {
                dispatch(register(name, email, password));
            }
        } catch (error) {
            console.error("Axios error:", error);
            console.error("Response data:", error.response.data);
        }
    };

    const redirect = location.search ? `/${location.search.split("=")[1]}` : "/account";

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
        if (verifyUserAuthenticate) {
            navigate(redirect);
        }
    }, [error, dispatch, verifyUserAuthenticate]);

    return (
        <div className="padding-login container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isLogin ? 'Login' : 'Register'}
                            </h2>
                            {loading ? (
                                <Loader />
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    {!isLogin && (
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Enter your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                id="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <i className="fa fa-eye-slash"></i>
                                                ) : (
                                                    <i className="fa fa-eye"></i>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        {loading ? 'Logging in...' : 'Submit'}
                                    </button>
                                    {isLogin ? (
                                        <Link to="/password/forgot" className="d-block mt-3">
                                            Forgot Password?
                                        </Link>
                                    ) : null}
                                    <p className="mt-2">
                                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                                        <span className="toggle-link" onClick={toggleForm}>
                                            {isLogin ? ' Register here' : ' Login here'}
                                        </span>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
