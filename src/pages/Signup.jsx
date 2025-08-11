import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        phone: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/signup', formData);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="signup-container">
            <div className="quote-section">
                <h1>Be a Hero, Donate Blood</h1>
                <p>"Your one donation can save up to three lives. Join the cause today!"</p>
            </div>
            <div className="signup-form">
                <h2>Blood Donation Signup</h2>
                <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                <textarea name="address" placeholder="Address" rows="4" value={formData.address} onChange={handleChange}></textarea>
                <button onClick={handleSubmit}>Submit</button>
                {message && <p className="response-message">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;
