const Post = require('../models/Post');

const createPost = async (data) => {
    const post = new Post(data);
    await post.save();
    return post;
};

const getAllPosts = async () => {
    const posts = await Post.find();
    return posts;
};

const getAllPostsByUserId = async (userId) => {
    const posts = await Post.find({ userId });
    return posts;
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId };