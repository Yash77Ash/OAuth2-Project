import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../assets/css/style.css";
import axios, { Axios } from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/auth/signup', formData);
            console.log('Signup successful:', response.data);  // Log response from backend
            navigate('/signin'); // Navigate to sign-in page after successful sign-up
            toast.success('Account created successfully!');
        } catch (error) {
            console.error('Signup error:', error);  // Log the error if request fails
            setError(error.response?.data?.message || 'Failed to create account. Please try again.');
            toast.error('Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-scroller" style={{ backgroundColor: "slategrey" }}>
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            {/* Breadcrumb Section */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Sign Up
                                    </li>
                                </ol>
                            </nav>
                            {/* End Breadcrumb Section */}
                            <div className="auth-form-light text-start py-5 px-4 px-sm-5">
                                <h4>Create a New Account</h4>
                                <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg custom-border"
                                            placeholder="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg custom-border"
                                            placeholder="Email"
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
                                            {loading ? 'Signing Up...' : 'SIGN UP'}
                                        </button>
                                    </div>
                                    <div className="text-center mt-4 fw-light">
                                        Already have an account?{' '}
                                        <Link to="/signin" className="text-primary">
                                            Login
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
