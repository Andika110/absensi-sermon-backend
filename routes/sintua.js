const express = require('express');
const router = express.Router();
const sintuaController = require('../controllers/sintuaController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.use(authenticate, requireAdmin);

router.post('/', sintuaController.createSintua);
router.get('/', sintuaController.getAllSintua);
router.get('/:id', sintuaController.getSintuaById);
router.put('/:id', sintuaController.updateSintua);
router.delete('/:id', sintuaController.deleteSintua);

module.exports = router;
