const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
}, {
    timestamps: true,
});

commentSchema.virtual('replies', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentId',
    justOne: false,
});

commentSchema.set('toJSON', {
    transform: (doc, ret) => {
        return {
            id: ret._id,
            content: ret.content,
            userId: ret.userId,
            postId: ret.postId,
            parentId: ret.parentId,
            createdAt: ret.createdAt,
            updatedAt: ret.updatedAt
        }
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;