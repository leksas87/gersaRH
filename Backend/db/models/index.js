const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Check,CheckSchema}=require('./check.model');
const { Contract, ContractSchema } = require('./contract.model');
const { Schedule, ScheduleSchema } = require('./schedule.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Check.init(CheckSchema,Check.config(sequelize));
  Contract.init(ContractSchema, Contract.config(sequelize));
  Schedule.init(ScheduleSchema,Schedule.config(sequelize));

  Employee.associate(sequelize.models);
  Check.associate(sequelize.models);
  Contract.associate(sequelize.models);
}

module.exports = setupModels;