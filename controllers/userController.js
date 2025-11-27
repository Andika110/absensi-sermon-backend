const bcrypt = require('bcrypt');
const db = require('../models');

const User = db.User;
const Sintua = db.Sintua;

exports.createUser = async (req, res) => {
  try {
    const { username, password, role, sintua_id } = req.body;

    if (!username || !password || !sintua_id) {
      return res
        .status(400)
        .json({ message: 'username, password, dan sintua_id wajib diisi' });
    }

    // Cek username unik
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: 'Username sudah dipakai' });
    }

    // Cek sintua ada
    const sintua = await Sintua.findByPk(sintua_id);
    if (!sintua) {
      return res.status(404).json({ message: 'Sintua tidak ditemukan' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password_hash: hash,
      role: role || 'sintua', // default sintua
      sintua_id,
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      sintua_id: newUser.sintua_id,
    });
  } catch (error) {
    console.error('Create user error', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    if (username) {
      const existing = await User.findOne({
        where: { username },
      });
      if (existing && existing.id !== user.id) {
        return res.status(400).json({ message: 'Username sudah dipakai' });
      }
      user.username = username;
    }

    if (typeof role === 'string') {
      user.role = role;
    }

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.password_hash = hash;
    }

    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      sintua_id: user.sintua_id,
    });
  } catch (error) {
    console.error('Update user error', error);
    res.status(500).json({ message: error.message });
  }
};

