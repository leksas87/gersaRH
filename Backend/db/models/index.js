const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Logbook,LogbookSchema}=require('./logbook.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Logbook.init(LogbookSchema,Logbook.config(sequelize));

  Employee.associate(sequelize.models);
  Logbook.associate(sequelize.models);
}

module.exports = setupModels;