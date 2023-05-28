import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import styles from '../styles/styles';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit} sx={styles.loginForm}>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
