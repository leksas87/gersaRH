const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Logbook,LogbookSchema}=require('./logbook.model');
const { Contract, ContractSchema } = require('./contract.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Logbook.init(LogbookSchema,Logbook.config(sequelize));
  Contract.init(ContractSchema, Contract.config(sequelize));

  Employee.associate(sequelize.models);
  Logbook.associate(sequelize.models);
  Contract.associate(sequelize.models);
}

module.exports = setupModels;