const express = require('express');
const router = express.Router();
const Group = require('../storageSchema/group');
const authMiddleware = require('../middlewares/auth');




// CREATE a group
router.post('/create', async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// JOIN a group
router.post('/join/:id', async (req, res) => {
  const { user } = req.body;
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (group.members.includes(user)) {
      return res.status(400).json({ message: 'Already a member of this group' });
    }

    group.members.push(user);
    await group.save();
    res.status(200).json({ message: 'Joined group successfully', group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LEAVE a group
router.post('/leave/:id', async (req, res) => {
  const { user } = req.body;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: user } },
      { new: true }
    );

    if (!updatedGroup) return res.status(404).json({ message: 'Group not found' });
    res.json(updatedGroup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all groups (for /nearby-groups)
router.get('/all', async (req, res) => {
  try {
    const groups = await Group.find().sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    console.error("Error in /group/all:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET groups that include this user (My Groups)
router.get('/my-groups', authMiddleware, async (req, res) => {
  const userEmail = req.user.email; // Comes from decoded JWT

  try {
    const groups = await Group.find({ members: userEmail }).sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET group by ID (used internally)
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;