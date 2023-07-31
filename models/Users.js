const { Schema, model } = require('mongoose');

const friendsSchema = new Schema(
    {
        friendsId: {
            type: Schema.Types.ObjectId,
            default: Schema.Types.ObjectId,
        },
        name: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [friendsSchema]
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

userSchema.pre('remove', async function (next) {
    const Thought = mongoose.model('thoughts');
  
    try {
      await Thought.deleteMany({ user: this._id });
      next();
    } catch (error) {
      next(error);
    }
  });

 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', userSchema);

module.exports = Users;