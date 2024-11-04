const postService = require("../services/postService");

const createPost = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.userId = req.user.id;

        const post = await postService.createPost(reqBody);

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllPostsByUserId = async (req, res) => {
    try {
        const posts = await postService.getAllPostsByUserId(req.user.id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createPost, getAllPosts, getAllPostsByUserId };