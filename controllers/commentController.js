const commentService = require('../services/commentService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

const createComment = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.userId = req.user.id;

        const comment = await commentService.createComment(reqBody);
        successResponse(res, comment);
    } catch (error) {
        errorResponse(res, error.message, 400);
    }
};


module.exports = {
    createComment
}