const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.createAgentUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      `INSERT INTO agent_users (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );

    res.status(201).json({
      message: 'Agent user created successfully',
      data: {
        id: result.insertId,
        username
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.authenticateAgentUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM agent_users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      message: 'Authentication successful',
      data: {
        id: user.id,
        username: user.username,
        token: token
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
