const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// Semua route user hanya boleh diakses admin
router.use(authenticate, requireAdmin);

// POST /api/user  -> buat akun login baru utk sintua
router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);


module.exports = router;
