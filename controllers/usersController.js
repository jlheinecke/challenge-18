const { Users, Thoughts } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user and thoughts and friends
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }

                const username = user.username;

                Thoughts.find({ username })
                    .then((thoughts) => {
                        user = user.toObject();
                        user.thoughts = thoughts;
                        res.json(user);
                    })
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },
    // Creates new user
    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user and associated thoughts
    deleteUser(req, res) {

        Users.findById(req.params.userId)
            .then(async (user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                const usernameToDelete = user.username;
                await Users.findByIdAndDelete(userId);
                await Thoughts.deleteMany({ username: usernameToDelete });
                res.json({ message: 'User and associated thoughts deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },

    // Update user
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            // { runValidators: false, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Add a friend
    addFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.json(user);
            })
            .catch((err) => {
                console.error('Error adding friend:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },

    //delete a friend
    deleteFriend(req, res) {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        Users.findById(userId)
            .select('-__v')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }

                const friendIndex = user.friends.findIndex((friend) => friend._id.toString() === friendId);
                const targetName = user.friends[friendIndex].name;

                Users.findOneAndUpdate(
                    { "friends.name": targetName },
                    { $pull: { friends: { name: targetName } } },
                    { new: true }
                )
                    .then((updatedUser) => {
                        if (!updatedUser) {
                            return res.status(404).json({ message: 'No user with that friend name' });
                        }
                        res.json({ message: 'Friend deleted!', updatedUser });
                    })
                    .catch((err) => {
                        console.error('Error deleting friend:', err);
                        res.status(500).json({ message: 'Error deleting friend', error: err });
                    });
            })
    }
};
