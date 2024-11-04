const postService = require("../services/postService");
const responseHelper = require('../helpers/responseHelper');

const createPost = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.userId = req.user.id;

        const post = await postService.createPost(reqBody);

        responseHelper.success(res, post);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        responseHelper.success(res, posts);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
}

const getAllPostsByUserId = async (req, res) => {
    try {
        const posts = await postService.getAllPostsByUserId(req.user.id);
        responseHelper.success(res, posts);
    } catch (error) {
        responseHelper.error(res, error.message, 400);
    }
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId };