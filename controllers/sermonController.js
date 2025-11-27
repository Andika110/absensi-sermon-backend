const db = require('../models');
const Sermon = db.Sermon;

exports.createSermon = async (req, res) => {
  try {
    const { tanggal, judul, lokasi } = req.body;
    const sermon = await Sermon.create({ tanggal, judul, lokasi });
    res.status(201).json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSermons = async (req, res) => {
  try {
    const sermons = await Sermon.findAll();
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW
exports.getSermonById = async (req, res) => {
  try {
    const sermon = await Sermon.findByPk(req.params.id);
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });
    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSermon = async (req, res) => {
  try {
    const { tanggal, judul, lokasi } = req.body;
    const sermon = await Sermon.findByPk(req.params.id);
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });

    sermon.tanggal = tanggal ?? sermon.tanggal;
    sermon.judul   = judul   ?? sermon.judul;
    sermon.lokasi  = lokasi  ?? sermon.lokasi;
    await sermon.save();

    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByPk(req.params.id);
    if (!sermon) return res.status(404).json({ message: 'Sermon not found' });

    await sermon.destroy();
    res.json({ message: 'Sermon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
