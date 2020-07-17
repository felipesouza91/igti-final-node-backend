import express from 'express';
import transactionController from '../controllers/transaction-controller.js';
const transactionsRouter = express.Router();

transactionsRouter.get('/', transactionController.index);
transactionsRouter.get('/:id', transactionController.findById);
transactionsRouter.post(
  '/',
  transactionController.transactionValidator,
  transactionController.create
);
transactionsRouter.put(
  '/:id',
  transactionController.transactionValidator,
  transactionController.updateById
);
transactionsRouter.delete('/:id', transactionController.deleteById);

export default transactionsRouter;
