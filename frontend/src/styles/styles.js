import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const styles = {
    loginPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: `url('/src/assets/images/background.jpg') no-repeat center / cover`,
    },
    loginFormContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1),
        textAlign: 'center',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(2),
    },
};

export default styles;
