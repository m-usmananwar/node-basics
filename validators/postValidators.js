const { body, validationResult } = require('express-validator');

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
        return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
};

module.exports = {
    createPostValidationRules,
    validate
}