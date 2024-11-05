const postRepository = require('../repositories/postRepository');

const createPost = async (data) => {
    const post = await postRepository.createPost(data);
    return post;
};

const getAllPosts = async (paginationData) => {
    const posts = await postRepository.getAllPosts(paginationData);
    return posts;
};

const getAllPostsByUserId = async (userId, paginationData) => {
    const posts = await postRepository.getAllPostsByUserId(userId, paginationData);
    return posts;
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId }