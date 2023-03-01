const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { setBudget, getTotalIncome, getBudget, getTotalExpenses } = require('../controllers/reports');

const router = Router();

router.post('/budget/set', [
    check('budget', 'Budget is required').not().isEmpty(),
    check('budget', 'Budget must be a number').isNumeric(),
    validateJWT,
    validateFields
], setBudget);

router.get('/budget', [
    validateJWT,
    validateFields
], getBudget);

router.get('/income', [
    validateJWT,
    validateFields
], getTotalIncome);

router.get('/expenses', [
    validateJWT,
    validateFields
], getTotalExpenses);

module.exports = router;