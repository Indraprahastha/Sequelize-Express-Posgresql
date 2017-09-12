'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type    : DataTypes.STRING,
      isUnique :true,
      allowNull:false,
      validate:{
        isEmail : true
      }
    }
  })

  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {through: 'Studentsubject',foreignKey: 'student_id'});
  }

  return Student;
};
