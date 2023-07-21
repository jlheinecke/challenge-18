const { Schema, model } = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const thoughtsSchema = new Schema(
    {
        thougthText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: String,
                required: true,
            },
        ],
        //reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

reactionsSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});

thoughtsSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;


