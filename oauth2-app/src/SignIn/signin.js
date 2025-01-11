import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/style.css";
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/signin', formData);
            const token = response.data.token;
            cookies.set("Token", token, { path: '/', secure: true, sameSite: "Strict" });

            toast.success('Successfully signed in!');
            const redirectUrl = localStorage.getItem('redirectUrl') || '/home';
            navigate(redirectUrl); 
        } catch (error) {
            console.error(error);
            if (error.response?.status === 403) {
                setError('Forbidden: Incorrect username or password.');
            } else {
                setError(error.response?.data?.message || 'Invalid credentials.');
            }
            toast.error(error.response?.data?.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            window.location.href = 'http://localhost:8081/oauth2/authorization/google';
        } catch (error) {
            console.error("Google Sign-In failed: ", error);
            toast.error("Google Sign-In failed. Please try again.");
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            cookies.set("Token", token, { path: '/', secure: true, httpOnly: true });
            toast.success('Successfully signed in with Google!');
            const redirectUrl = localStorage.getItem('redirectUrl') || '/home';
            navigate(redirectUrl);
        }
    }, [cookies, navigate]);

    return (
        <>
            <div className="container-scroller" style={{ backgroundColor: "slategrey" }}>
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Sign In</li>
                                    </ol>
                                </nav>
                                <div className="auth-form-light text-start py-5 px-4 px-sm-5">
                                    <h4>Welcome Back!</h4>
                                    <h6 className="fw-light">Sign in to continue</h6>
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control form-control-lg custom-border"
                                                placeholder="Username"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control form-control-lg custom-border"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="off"
                                                required
                                            />
                                        </div>
                                        {error && <p className="text-danger">{error}</p>}
                                        <div className="mt-3 d-grid gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg fw-medium auth-form-btn"
                                                disabled={loading}
                                            >
                                                {loading ? 'Signing In...' : 'SIGN IN'}
                                            </button>
                                        </div>
                                        <div className="text-center mt-4 fw-light">
                                            Don't have an account?{' '}
                                            <Link to="/signup" className="text-primary">Create</Link>
                                        </div>

                                        <div className="mt-4 d-grid gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-light btn-lg"
                                                onClick={handleGoogleSignIn}
                                            >
                                                <span className="google-icon">
                                                    <img
                                                        src={require('../assets/google.png')}
                                                        alt="Sign in with Google"
                                                        style={{ width: '20px', marginRight: '10px' }}
                                                    />
                                                </span>
                                                <strong style={{ margin: "10px", border: "300px" }}>
                                                    Sign in with Google
                                                </strong>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
