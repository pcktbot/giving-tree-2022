const { INTEGER, STRING, JSONB, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const gift = sequelize.define('gift', {
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
    options: {
      type: JSONB
    },
    group: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: STRING
    },
    gifter: {
      type: STRING
    },
    claimed: {
      type: BOOLEAN,
      default: false
    }
  }, { paranoid: true })
  // gift.associate = (models) => {
  //   models.gift.belongsTo(models.gifter)
  // }
  return gift
}
