const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../helpers/responseHelper');
const authRepository = require('../repositories/authRepository');

const registerValidationRules = () => [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .custom(async(value) => {
            const user = await authRepository.isUserExistsWithUsername(value);
            if (user) {
                throw new Error('Username already exists');
            }
            return true;
        }),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async(value) => {
            const user = await authRepository.isUserExistsWithEmail(value);
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
            const user = await authRepository.isUserExistsWithEmail(value);
            if (!user) {
                throw new Error('No user found with this email');
            }
            if(user.emailVerifiedAt === null) {
                throw new Error('Email is not verified');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 6 characters'),
];

const verificationValidationRules = () => [
    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .custom(async (value) => {
            const user = await authRepository.isUserExistsWithEmail(value);
            if (!user) {
                throw new Error('No user found with this email');
            }
            if(user.emailVerifiedAt !== null) {
                throw new Error('Email is already verified');
            }
            return true;
        }),
    body('verificationCode')
        .notEmpty()
        .withMessage('Verification code is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().map(err => err.msg), 400);
    }
    next();
};

module.exports = {
    registerValidationRules,
    loginValidationRules,
    verificationValidationRules,
    validate,
};
