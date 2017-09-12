'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    id_subject: DataTypes.INTEGER
  })

  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject, {foreignKey:'id_subject',targetKey:'id'})
  }
//foreign key itu berarti id-nya si penghubung //target key adalah id utama yang dituju
  return Teacher;
};
