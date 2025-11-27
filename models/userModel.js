module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // contoh: 'sintua', 'admin'
      allowNull: false,
      defaultValue: 'sintua',
    },
    sintua_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return User;
};
