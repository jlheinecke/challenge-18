const { Schema, Types } = require('mongoose');

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
          ref: 'Thought',
        },
      ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
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

module.exports = assignmentSchema;