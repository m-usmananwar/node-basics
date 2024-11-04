const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const responseHelper = require('../helpers/responseHelper');

const registerValidationRules = () => [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .custom(async(value) => {
            const user = await User.findOne({ username: value });
            if (user) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async(value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 6 characters'),
];

const loginValidationRules = () => [
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async(value) => {
            const user = await User.findOne({ email: value });
            if (!user) {
                throw new Error('No user found with this email');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 6 characters'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseHelper.error(res, errors.array().map(err => err.msg), 400);
    }
    next();
};

module.exports = {
    registerValidationRules,
    loginValidationRules,
    validate,
};
