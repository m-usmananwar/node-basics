const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',
    justOne: false,
});

postSchema.set('toJSON', {
    transform: (doc, ret) => {
        return {
            title: ret.title,
            description: ret.description,
            createdAt: ret.createdAt,
            updatedAt: ret.updatedAt
        };
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;