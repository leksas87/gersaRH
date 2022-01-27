const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));

  Employee.associate(sequelize.models);
}

module.exports = setupModels;