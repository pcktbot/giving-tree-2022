const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const gifter = sequelize.define('gifter', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false
    }
  }, { paranoid: true })
  // gifter.associate = (models) => {
  //   models.gifter.belongsToMany(models.gift, { through: '' })
  // }
  return gifter
}
