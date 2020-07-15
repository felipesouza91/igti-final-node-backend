import express from 'express';
import transactionController from '../controllers/transaction-controller.js';
const transactionsRouter = express.Router();

transactionsRouter.get('/', transactionController.index);
transactionsRouter.post(
  '/',
  transactionController.transactionValidator,
  transactionController.create
);

export default transactionsRouter;
