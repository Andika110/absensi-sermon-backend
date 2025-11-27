const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.User;
const Sintua = db.Sintua;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib' });
    }

    const user = await User.findOne({
      where: { username },
      include: [{ model: Sintua, attributes: ['id', 'nama', 'sektor', 'jabatan'] }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const token = jwt.sign(
      {
        user_id: user.id,
        sintua_id: user.sintua_id,
        role: user.role,
      },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        sintua_id: user.sintua_id,
        sintua: user.Sintua,
      },
    });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: error.message });
  }
};
