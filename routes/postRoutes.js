const postController = require('../controllers/postController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createPostValidationRules, getPostByIdValidationRules, validate} = require('../validators/postValidators');

const express = require('express');

const router = express.Router();

router.get('/:id', authenticateToken, getPostByIdValidationRules(), validate, postController.getPost);
router.post('/', authenticateToken, createPostValidationRules(), validate, postController.createPost);
router.get('/', authenticateToken, postController.getAllPosts);
router.get('/user', authenticateToken, postController.getAllPostsByUserId);

module.exports = router;