const Comment = require("../models/Comment");

const createComment = async (data) => {
    const comment = new Comment(data);
    await comment.save();
    return comment;
};

const getCommentById = async (id) => {
    const comment = await Comment.findById(id);
    return comment;
}

module.exports = {
    createComment,
    getCommentById,
}