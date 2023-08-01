const { Thoughts } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
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
        console.log(req.body)
        Thoughts.create(req.body)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                res.status(500).json(err)
                console.log(err)
            });

    },
    // Delete a thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID1' });
                }

                res.json({ message: 'Thought deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },
    // Delete all thoughts
    deleteAllThoughts(req, res) {
        Thoughts.deleteMany({})
            .then((thought) => {

                res.json({ message: 'All thoughts deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },


    // Update thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughtId) =>
                !thoughtId
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughtId)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Create reaction
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'Thought not found' });
                }

                res.json(updatedThought);
            })
            .catch((err) => {
                console.error('Error adding reaction:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },

    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            // The reaction has been successfully removed
            console.log('Reaction deleted');
    
            // Handle the rest of the logic or send a response here
            res.json({ message: 'Reaction deleted!', thought });
        })
        .catch((error) => {
            console.error('Error deleting reaction:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
    }
};
