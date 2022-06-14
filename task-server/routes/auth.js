const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Invalid password').isLength({ min: 6 }),
    check('password', 'Password is required').not().isEmpty(),
    validateField
] ,login);


module.exports = router; 