import dotenv from 'dotenv';

import connection from './config/db-connection.js';
import express from 'express';
import cors from 'cors';
import transactionRouter from './router/transaction-router.js';
dotenv.config();

var app = express();

app.use(express.json());
app.use(cors('*'));
app.use('/transactions', transactionRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
