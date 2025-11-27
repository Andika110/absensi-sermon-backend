module.exports = (sequelize, DataTypes) => {
  const Sintua = sequelize.define('Sintua', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: DataTypes.STRING,
    kontak: DataTypes.STRING,
    sektor: DataTypes.STRING,
    jabatan: DataTypes.STRING,
  });
  return Sintua;
};
