const postService = require("../services/postService");
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { getPaginationData } = require('../helpers/paginationHelper');

const createPost = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.userId = req.user.id;

        const post = await postService.createPost(reqBody);

        successResponse(res, post);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const paginationData = getPaginationData(req);

        const posts = await postService.getAllPosts(paginationData);
        successResponse(res, posts);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
}

const getAllPostsByUserId = async (req, res) => {
    try {
        const paginationData = getPaginationData(req);

        const posts = await postService.getAllPostsByUserId(req.user.id, paginationData);
        successResponse(res, posts);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId };