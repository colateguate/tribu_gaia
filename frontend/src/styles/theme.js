import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8ea07d', // color primary
        },
        secondary: {
            main: '#FFFFFF', // color secondary
        },
        // Add more colors as needed
    },
    typography: {
        fontFamily: '"Arial"',
        fontSize: 14,
        // Add more typography styles as needed
    },
    // Add more theme properties as needed
});

export default theme;
