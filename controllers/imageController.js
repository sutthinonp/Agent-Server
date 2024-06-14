
const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
    
  const { agent_id } = req.body;
  const imgData = req.file ? fs.readFileSync(req.file.path) : null;
  const imgType = req.file ? req.file.mimetype : null;

  if (!agent_id || !imgData || !imgType) {
    return res.status(400).json({ message: 'Agent ID and image are required' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO agent_images (agent_id, img_data, img_type) VALUES (?, ?, ?)`,
      [agent_id, imgData, imgType]
    );

    res.status(201).json({
      message: 'Image uploaded successfully',
      data: {
        id: result.insertId,
        agent_id,
        img_type: imgType
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT img_data, img_type FROM agent_images WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imgData = rows[0].img_data;
    const imgType = rows[0].img_type;

    res.writeHead(200, {
      'Content-Type': imgType,
      'Content-Length': imgData.length
    });
    res.end(imgData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
