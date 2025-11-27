const db = require('../models');
const Sintua = db.Sintua;
const User = db.User;

exports.createSintua = async (req, res) => {
  try {
    const { nama, kontak, sektor, jabatan } = req.body;
    const sintua = await Sintua.create({ nama, kontak, sektor, jabatan });
    res.status(201).json(sintua);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSintua = async (req, res) => {
  try {
    const sintuas = await Sintua.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'role'],
        },
      ],
      order: [['id', 'ASC']],
    });
    res.json(sintuas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW
exports.getSintuaById = async (req, res) => {
  try {
    const sintua = await Sintua.findByPk(req.params.id);
    if (!sintua) return res.status(404).json({ message: 'Sintua not found' });
    res.json(sintua);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSintua = async (req, res) => {
  try {
    const { nama, kontak, sektor, jabatan } = req.body;
    const sintua = await Sintua.findByPk(req.params.id);
    if (!sintua) return res.status(404).json({ message: 'Sintua not found' });

    sintua.nama   = nama   ?? sintua.nama;
    sintua.kontak = kontak ?? sintua.kontak;
    sintua.sektor = sektor ?? sintua.sektor;
    sintua.jabatan = jabatan ?? sintua.jabatan;
    await sintua.save();

    res.json(sintua);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSintua = async (req, res) => {
  try {
    const sintua = await Sintua.findByPk(req.params.id);
    if (!sintua) return res.status(404).json({ message: 'Sintua not found' });

    await sintua.destroy();
    res.json({ message: 'Sintua deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
