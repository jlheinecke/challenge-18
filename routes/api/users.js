const router = require('express').Router();
const User = require('../models/User');

//`GET` all users
router.get('/users', (req, res) => {
    // Using model in route to find all documents that are instances of that model
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Error');
            res.status(500).json({ message: 'Internal server error' });
        }
    });
});

//`GET` a single user by its `_id` and populated thought and friend data
router.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate('thoughts').populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//`PUT` to update a user by its `_id`
router.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//`DELETE` to remove user by its `_id`
router.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {

        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});