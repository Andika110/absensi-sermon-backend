const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ada' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    console.log('DECODED JWT:', decoded); // <-- tambah log ini
    req.user = decoded; // { user_id, sintua_id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};


exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Hanya admin yang dapat mengakses' });
  }
  next();
};


exports.authRequired = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = payload; // { user_id, sintua_id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};
