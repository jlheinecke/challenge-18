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
            .populate('thoughts')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
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
        const userId = req.params.userId;

        Users.findById(userId)
            .then(async (user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }

                // Save the associated username before deleting the user
                const usernameToDelete = user.username;

                // Delete the user
                await Users.findByIdAndDelete(userId);

                // Delete all thoughts associated with the username
                await Thoughts.deleteMany({ username: usernameToDelete });

                res.json({ message: 'User and associated thoughts deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },



    delete_User(req, res) {
        Users.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'User and thoughts deleted!' });
          })
        .then(() => Thoughts.deleteMany({_id: req.params.userId}))
            .catch((err) => res.status(500).json(err));
    },

    // Update user
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((application) =>
                !application
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(application)
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
            { $addToSet: { tags: req.body } },
            { runValidators: true, new: true }
        )
            .then((application) =>
                !application
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(application)
            )
            .catch((err) => res.status(500).json(err));
    },

};
