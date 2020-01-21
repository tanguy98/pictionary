'use strict';

module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    word: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  return Word;
};
