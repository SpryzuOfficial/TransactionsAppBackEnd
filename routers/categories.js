const { Router } = require('express');
const { check } = require('express-validator');

const { addCategory, editCategory, deleteCategory, getCategories } = require('../controllers/categories');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    validateJWT,
    validateFields,
], addCategory);

router.post('/edit', [
    check('id', 'Category Id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    validateJWT,
    validateFields,
], editCategory);

router.delete('/', [
    check('id', 'Category Id is required').not().isEmpty(),
    validateJWT,
    validateFields,
], deleteCategory);

router.get('/', [
    validateJWT,
    validateFields,
], getCategories);

module.exports = router;