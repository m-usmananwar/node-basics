const postRepository = require('../repositories/postRepository');

const getPost = async (id, data) => {
    const post = await postRepository.getPostById(id, data.loadComments ?? false);
    return post;
}
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

module.exports = { createPost, getAllPosts, getAllPostsByUserId, getPost }