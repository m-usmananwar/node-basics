const validator = require('express-validator');
const { getPostById } = require('../repositories/postRepository');
const { getCommentById } = require('../repositories/commentRepository');
const { errorResponse } = require('../helpers/responseHelper');

const createCommentValidationRules = () => {
    return [
        validator.body('content')
            .notEmpty()
            .withMessage('Content is required'),
        validator.body('postId')
            .notEmpty()
            .withMessage('Post ID is required')
            .custom(async (value) => {
                const post = await getPostById(value);
                if (!post) {
                    throw new Error('Post not found');
                }
            }),
        validator.body('parentId')
            .optional()
            .custom(async (value, { req }) => {
                const comment = await getCommentById(value);
                if (!comment) {
                    throw new Error('Comment not found');
                }
            })
    ]
}

const validate = (req, res, next) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().map(err => err.msg), 400);
    }
    next();
};

module.exports = { validate, createCommentValidationRules }