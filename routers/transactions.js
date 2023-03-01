const { Router } = require('express');

const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { addTransaction, deleteTransaction, getTransactions } = require('../controllers/transactions');
const { check } = require('express-validator');

const router = Router();

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('amount', 'Amount is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Category must be an object').isObject(),
    check('isSpent', 'isSpent is required').not().isEmpty(),
    validateJWT,
    validateFields,
], addTransaction);

router.get('/', [
    validateJWT,
    validateFields,
], getTransactions);

router.delete('/', [
    check('id', 'Transaction Id is required').not().isEmpty(),
    validateJWT,
    validateFields,
], deleteTransaction);

module.exports = router;