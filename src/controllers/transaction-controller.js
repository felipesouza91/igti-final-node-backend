import Transactions from '../model/Transactions.js';
import validator from 'express-validator';

const TransactionController = {
  index: async (req, res) => {
    const { period } = req.query;
    if (!period) {
      return res.status(400).json({
        error: `É necessario informar o parametro "period", cujo o valor deve estar no formato yyyy-mm`,
      });
    }
    const result = await Transactions.find({ yearMonth: period });

    return res.json(result);
  },

  create: async (req, res) => {
    const erros = validator.validationResult(req);
    if (!erros.isEmpty()) {
      console.log(erros);
      return res
        .status(400)
        .json({ error: 'Informe todos os campos obrigatorios' });
    }
    const { description, value, category, year, month, day, type } = req.body;
    const transaction = {
      description,
      value,
      category,
      year,
      month,
      day,
      type,
      yearMonth: ` ${year}-${month}`,
      yearMonthDay: ` ${year}-${month}-${day}`,
    };
    const result = await Transactions.create(transaction);
    return res.json(result);
  },

  transactionValidator: [
    validator.check('description').isString(),
    validator.check('value').isNumeric(),
    validator.check('category').isString(),
    validator.check('year').isNumeric(),
    validator.check('month').isNumeric(),
    validator.check('day').isNumeric(),
  ],
};

export default TransactionController;
