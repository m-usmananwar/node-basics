const { body, validationResult } = require('express-validator');
const responseHelper = require('../helpers/responseHelper');

const createPostValidationRules = () => [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return responseHelper.error(res, errors.array().map(err => err.msg), 400);
    }
    next();
};

module.exports = {
    createPostValidationRules,
    validate
}