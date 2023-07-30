const { Thoughts } = require('../models');

module.exports = {
    // Delete a reaction
    deleteReaction(req, res) {
        Thoughts.findOneAndDelete({ reactionId: req.params.reactionId })
            .then((reaction) => {
                if (!reaction) {
                    return res.status(404).json({ message: 'No reaction with that ID' });
                }

                res.json({ message: 'Reaction deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },
};
