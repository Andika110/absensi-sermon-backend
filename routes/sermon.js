const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermonController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.get('/:id', authenticate, sermonController.getSermonById);

router.use(authenticate, requireAdmin);
router.post('/', sermonController.createSermon);
router.get('/', sermonController.getAllSermons);
router.get('/:id', sermonController.getSermonById);      // NEW
router.put('/:id', sermonController.updateSermon);        // NEW
router.delete('/:id', sermonController.deleteSermon);     // NEW

module.exports = router;
