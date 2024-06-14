const express = require('express');
const { createAgentUser, authenticateAgentUser } = require('../controllers/agentUserController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', createAgentUser);
router.post('/login', authenticateAgentUser);

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
