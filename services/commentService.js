const commentRepository = require("../repositories/commentRepository");

const createComment = async (data) => {
    const comment = await commentRepository.createComment(data);
    return comment;
};

module.exports = {
    createComment,
};