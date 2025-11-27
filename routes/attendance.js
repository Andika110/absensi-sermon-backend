const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// route untuk self-checkin jemaat (butuh login, tapi tidak harus admin)
router.post('/self-checkin', authenticate, attendanceController.selfCheckin);

// route admin: rekap dll
router.get(
  '/sermon/:id',
  authenticate,
  requireAdmin,
  attendanceController.getAttendanceBySermon
);

router.get(
  '/sintua/:id',
  authenticate,
  requireAdmin,
  attendanceController.getAttendanceBySintua
);

// kalau ada addAttendance / addAttendanceBulk khusus admin:
router.post(
  '/',
  authenticate,
  requireAdmin,
  attendanceController.addAttendance
);

router.post(
  '/bulk',
  authenticate,
  requireAdmin,
  attendanceController.addAttendanceBulk
);

module.exports = router;
