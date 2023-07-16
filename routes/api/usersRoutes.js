const router = require('express').Router();
const { Users } = require('../../models');

//`GET` all users
router.get('/users', (req, res) => {
    Users.find({}, (err, result) => {
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
        const user = await Users.findById(userId).populate('thoughts').populate('friends');

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
        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
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

        const deletedUser = await Users.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//`POST` to add a new friend to a user's friend list
router.post('/users/:userId/friends:friendId', async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.body.friendId;
  
    try {
      const user = await Users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      Users.friends.push(friendId);
      const updatedUser = await Users.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //`DELETE` to remove a friend from a user's friend list
  router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
  
    try {
      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const friendIndex = Users.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found' });
      }
      Users.friends.splice(friendIndex, 1);
      const updatedUser = await Users.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;