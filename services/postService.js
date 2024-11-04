const postRepository = require('../repositories/postRepository');

const createPost = async (data) => {
    const post = await postRepository.createPost(data);
    return post;
};

const getAllPosts = async () => {
    const posts = await postRepository.getAllPosts();
    return posts;
};

const getAllPostsByUserId = async (userId) => {
    const posts = await postRepository.getAllPostsByUserId(userId);
    return posts;
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId }