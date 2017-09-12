'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  })

  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher, {foreignKey: 'id_subject', sourceKey: 'id'});
    Subject.belongsToMany(models.Student, {through: 'Studentsubject',foreignKey: 'subject_id'});
  }

  return Subject;
};
