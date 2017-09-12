'use strict';
module.exports = function(sequelize, DataTypes) {
  var Studentsubject = sequelize.define('Studentsubject', {
    subject_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Studentsubject;
};
