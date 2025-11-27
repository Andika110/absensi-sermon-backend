const db = require('../models');
const Attendance = db.Attendance;
const Sintua = db.Sintua;
const Sermon = db.Sermon;

exports.addAttendance = async (req, res) => {
  try {
    const { sermon_id, sintua_id, status_kehadiran, catatan } = req.body;

    const [attendance] = await Attendance.findOrCreate({
      where: { sermon_id, sintua_id },
      defaults: { status_kehadiran, catatan },
    });

    if (!attendance.isNewRecord) {
      attendance.status_kehadiran = status_kehadiran;
      attendance.catatan = catatan;
      await attendance.save();
    }

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW: bulk input satu sermon
exports.addAttendanceBulk = async (req, res) => {
  try {
    const { sermon_id, items } = req.body;
    if (!sermon_id || !Array.isArray(items)) {
      return res.status(400).json({ message: 'sermon_id dan items wajib' });
    }

    const results = [];
    for (const item of items) {
      const { sintua_id, status_kehadiran, catatan } = item;
      const [attendance] = await Attendance.findOrCreate({
        where: { sermon_id, sintua_id },
        defaults: { status_kehadiran, catatan },
      });
      if (!attendance.isNewRecord) {
        attendance.status_kehadiran = status_kehadiran;
        attendance.catatan = catatan;
        await attendance.save();
      }
      results.push(attendance);
    }

    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendanceBySermon = async (req, res) => {
  try {
    const sermonId = req.params.id;
    const attendances = await Attendance.findAll({
      where: { sermon_id: sermonId },
      include: [
        { model: Sintua, attributes: ['id', 'nama', 'sektor', 'jabatan'] },
        { model: Sermon, attributes: ['id', 'tanggal', 'judul', 'lokasi'] },
      ],
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW: rekap per sintua
exports.getAttendanceBySintua = async (req, res) => {
  try {
    const sintuaId = req.params.id;
    const attendances = await Attendance.findAll({
      where: { sintua_id: sintuaId },
      include: [
        { model: Sermon, attributes: ['id', 'tanggal', 'judul', 'lokasi'] },
      ],
      order: [['sermon_id', 'DESC']],
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.selfCheckin = async (req, res) => {
  try {
    const { sermon_id, lat, lng } = req.body;
    const { sintua_id } = req.user;

    if (!sermon_id || !sintua_id) {
      return res.status(400).json({ message: 'sermon_id atau sintua_id tidak valid' });
    }

    // TODO: validasi lokasi berdasarkan lat/lng + koordinat gereja
    // Untuk sementara, belum dicek jaraknya.

    const [attendance] = await Attendance.findOrCreate({
      where: { sermon_id, sintua_id },
      defaults: {
        status_kehadiran: 'Hadir',
        catatan: 'Self check-in',
      },
    });

    if (!attendance.isNewRecord) {
      attendance.status_kehadiran = 'Hadir';
      attendance.catatan = 'Self check-in';
      await attendance.save();
    }

    res.status(201).json(attendance);
  } catch (error) {
    console.error('Self-checkin error', error);
    res.status(500).json({ message: error.message });
  }
};

