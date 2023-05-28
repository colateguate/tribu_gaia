import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate instead of useHistory
import axios from 'axios';
import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import styles from '../styles/styles';
import logo from './../assets/images/logo.png';

const LoginPage = () => {
    const navigate = useNavigate(); // use navigate instead of history
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/'); // use navigate instead of history.push
        } catch (err) {
            setError('Failed to log in');
        }
    };

    return (
        <Box sx={styles.loginPage}>
            <Box sx={styles.loginFormContainer}>
                <img src={logo} alt="Logo" />
                <LoginForm onLogin={handleLogin} />
                {error && <p>{error}</p>}
            </Box>
        </Box>
    );
};

export default LoginPage;
