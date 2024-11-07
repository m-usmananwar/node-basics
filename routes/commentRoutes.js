const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validate, createCommentValidationRules } = require('../validators/commentValidators');

const express = require('express');

const router = express.Router();

router.post('/', authenticateToken, createCommentValidationRules(), validate, commentController.createComment);

module.exports = router;