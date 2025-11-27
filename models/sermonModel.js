module.exports = (sequelize, DataTypes) => {
  const Sermon = sequelize.define('Sermon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tanggal: DataTypes.DATE,
    judul: DataTypes.STRING,
    lokasi: DataTypes.STRING,
  });
  return Sermon;
};
