const { Thoughts } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Creates new thought
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !user
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : Application.deleteMany({ _id: { $in: user.applications } })
            )
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Update thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            // { runValidators: true, new: true }
        )
            .then((thought) =>
                !application
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(application)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Create reaction
     createReaction(req, res) {
        Thoughts.create(req.body)
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },
// Delete a reaction
deleteReaction(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.reactionId })
        .then((reaction) =>
            !user
                ? res.status(404).json({ message: 'No reaction with that ID' })
                : Application.deleteMany({ _id: { $in: user.applications } })
        )
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
}
};
