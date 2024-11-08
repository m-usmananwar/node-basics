const { body, param, validationResult } = require('express-validator');
const { errorResponse } = require('../helpers/responseHelper');
const { getPostById } = require('../repositories/postRepository');
const mongoose = require('mongoose');

const createPostValidationRules = () => [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .bail(),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
];

const getPostByIdValidationRules = () => [
    param('id')
        .notEmpty()
        .withMessage('Post ID is required')
        .bail()
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Post ID format');
            }
            return true;
        })
        .bail()
        .custom(async (value) => {
            const post = await getPostById(value);
            if (!post) {
                throw new Error('Post not found');
            }
            return true;
        }),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().map(err => err.msg), 400);
    }
    next();
};

module.exports = {
    createPostValidationRules,
    getPostByIdValidationRules,
    validate,
}