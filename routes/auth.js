const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const db = require('../models');
const bcrypt = require('bcrypt');

router.post('/login', authController.login);

// HANYA UNTUK SEEDING TEST
router.post('/seed-user', async (req, res) => {
  try {
    const { username, password, sintua_id } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      password_hash: hash,
      role: 'sintua',
      sintua_id,
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
