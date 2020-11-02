const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => sequelize.define('gift', {
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
  group: {
    type: STRING,
    allowNull: false
  },
  claimedBy: {
    type: STRING,
    allowNull: false
  }
})