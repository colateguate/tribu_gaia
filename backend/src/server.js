const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // this is the origin of your client app
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));  // apply CORS configuration

app.use(express.json());
app.use(errorHandler);

const port = process.env.NODE_ENV === 'test' ? 3000 : process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//USER ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

//STATUS ROUTES
const statusRoutes = require('./routes/statusRoutes');
app.use('/api', statusRoutes);

//EXPENSES CATEGORIES ROUTES
const expenseCategoryRoutes = require('./routes/expenseCategoryRoutes');
app.use('/api', expenseCategoryRoutes);

// EXPENSES ROUTES
const expensesRoutes = require('./routes/expenseRoutes');
app.use('/api', expensesRoutes);

// INCOME CATEGORIES ROUTES
const incomeCategoryRoutes = require('./routes/incomeCategoryRoutes');
app.use('/api', incomeCategoryRoutes);

module.exports = {
    app,
    server
};
