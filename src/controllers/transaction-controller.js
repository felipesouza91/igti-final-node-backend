import Transactions from '../model/Transactions.js';
import validator from 'express-validator';

const TransactionController = {
  index: async (req, res) => {
    const { period, description = '' } = req.query;
    if (!period) {
      return res.status(400).json({
        error: `É necessario informar o parametro "period", cujo o valor deve estar no formato yyyy-mm`,
      });
    }
    const result = await Transactions.find({
      yearMonth: period,
      description: { $regex: description, $options: 'i' },
    }).sort({
      day: 'asc',
    });

    return res.json({ size: result.length, transactions: result });
  },

  create: async (req, res) => {
    try {
      const erros = validator.validationResult(req);
      if (!erros.isEmpty()) {
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
        yearMonth: `${year}-${month}`,
        yearMonthDay: `${year}-${month}-${day}`,
      };
      const result = await Transactions.create(transaction);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao processar requisição, tente novamente mais tarde',
        error,
      });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const transatcion = await Transactions.findById(id);
      if (!transatcion) {
        return res.status(400).json({
          message: `Não foi encontrado uma transação com o id solicitado`,
        });
      }
      return res.json(transatcion);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao processar requisição, tente novamente mais tarde',
        error,
      });
    }
  },

  updateById: async (req, res) => {
    try {
      const erros = validator.validationResult(req);
      if (!erros.isEmpty()) {
        console.log(erros);
        return res
          .status(400)
          .json({ error: 'Informe todos os campos obrigatorios' });
      }
      const { id } = req.params;
      const transatcion = await Transactions.findById(id);
      if (!transatcion) {
        return res.status(400).json({
          message: `Não foi encontrado uma transação com o id solicitado`,
        });
      }
      const { description, value, category, year, month, day, type } = req.body;
      const object = {
        description,
        value,
        category,
        year,
        month,
        day,
        type,
        yearMonth: `${year}-${month}`,
        yearMonthDay: `${year}-${month}-${day}`,
      };

      const updateTransaction = await Transactions.findByIdAndUpdate(
        transatcion._id,
        object,
        { new: true }
      );
      return res.json(updateTransaction);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao processar requisição, tente novamente mais tarde',
        error,
      });
    }
  },

  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const transatcion = await Transactions.findById(id);
      if (!transatcion) {
        return res.status(400).json({
          message: `Não foi encontrado uma transação com o id solicitado`,
        });
      }
      await Transactions.findByIdAndDelete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao processar requisição, tente novamente mais tarde',
        error,
      });
    }
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
