const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const { userRegistration, getUser } = require("../controllers/user");
const { validateField } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');
const { existsEmail, existsUserID } = require('../helpers/db-validators');

router.get('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( existsUserID )
], getUser);

router.post("/register", [
    check('name', 'Name required').not().isEmpty(),
    check('lastname', 'Lastname required').not().isEmpty(),
    check('username', 'Username required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( existsEmail ),
    check('password', 'Invalid password').isLength({ min: 6 }),
    validateField
], userRegistration);

module.exports = router; 