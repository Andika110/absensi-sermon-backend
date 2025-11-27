const { Sequelize, DataTypes } = require('sequelize');

// Pakai SQLite, simpan di file database.sqlite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Sintua = require('./sintuaModel')(sequelize, DataTypes);
db.Sermon = require('./sermonModel')(sequelize, DataTypes);
db.Attendance = require('./attendanceModel')(sequelize, DataTypes);
db.User = require('./userModel')(sequelize, DataTypes); 

// Relasi
db.Sintua.hasMany(db.Attendance, { foreignKey: 'sintua_id' });
db.Attendance.belongsTo(db.Sintua, { foreignKey: 'sintua_id' });
db.Sermon.hasMany(db.Attendance, { foreignKey: 'sermon_id' });
db.Attendance.belongsTo(db.Sermon, { foreignKey: 'sermon_id' });

// Relasi User - Sintua
db.Sintua.hasOne(db.User, { foreignKey: 'sintua_id' });
db.User.belongsTo(db.Sintua, { foreignKey: 'sintua_id' });

module.exports = db;
