require('dotenv').config();

const cors = require('cors');
const express = require('express');

const connectDB = require('./database/connection');

const routes = {
    auth: '/auth',
    categories: '/categories',
    transactions: '/transactions',
    reports: '/reports'
}

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(routes.auth, require('./routers/auth'));
app.use(routes.categories, require('./routers/categories'));
app.use(routes.transactions, require('./routers/transactions'));
app.use(routes.reports, require('./routers/reports'));

app.listen(process.env.PORT, () =>
{
    console.log(`Server running on port ${process.env.PORT}`);
});