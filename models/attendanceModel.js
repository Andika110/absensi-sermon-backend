module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sermon_id: DataTypes.INTEGER,
    sintua_id: DataTypes.INTEGER,
    status_kehadiran: DataTypes.ENUM('Hadir', 'Izin', 'Tidak Hadir'),
    catatan: DataTypes.STRING,
  });
  return Attendance;
};
