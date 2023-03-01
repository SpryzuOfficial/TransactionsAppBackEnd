const { Router } = require('express');
const { check } = require('express-validator');

const { registerUser, logInUser, editUser, renewJWT } = require('../controllers/auth');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password must have 8 characters').isLength({ min: 8 }),
    validateFields,
], registerUser);

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
], logInUser);

router.post('/edit', [
    validateJWT,
    validateFields,
], editUser);

router.get('/renew', [
    validateJWT,
    validateFields,
], renewJWT);

module.exports = router;