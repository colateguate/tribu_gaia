import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // import Routes instead of Switch
import { ThemeProvider } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import theme from './styles/theme';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes> {/* use Routes instead of Switch */}
          <Route path="/login" element={<LoginPage />} /> {/* use element prop instead of component prop */}
          {/* Agrega más rutas aquí */}
        </Routes>
      </Router>
      {/* Tus otros componentes van aquí */}
    </ThemeProvider>
  );
}

export default App;
