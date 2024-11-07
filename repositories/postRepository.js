const Post = require('../models/Post');
const { buildPaginatedResponse } = require('../helpers/paginationHelper');

const createPost = async (data) => {
    const post = new Post(data);
    await post.save();
    return post;
};

const getAllPosts = async (paginationData) => {
    const query = {};

    const skip = (paginationData.page - 1) * paginationData.limit;

    const [results, total] = await Promise.all([
        Post.find(query).skip(skip).limit(paginationData.limit),
        Post.countDocuments(query),
      ]);
  
      return buildPaginatedResponse({
        page: paginationData.page,
        limit: paginationData.limit,
        total,
        data: results,
        filters: paginationData.filters,
    });
};

const getAllPostsByUserId = async (userId, paginationData) => {
    const query = { userId };

    const skip = (paginationData.page - 1) * paginationData.limit;

    const [results, total] = await Promise.all([
        Post.find(query).skip(skip).limit(paginationData.limit),
        Post.countDocuments(query),
      ]);
  
      return buildPaginatedResponse({
        page: paginationData.page,
        limit: paginationData.limit,
        total,
        data: results,
        filters: paginationData.filters,
    });
};

const getPostById = async (id) => {
    const post = await Post.findById(id);
    return post;
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId, getPostById };