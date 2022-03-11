const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Check,CheckSchema }=require('./check.model');
const { Event,EventSchema }=require('./event.model');
const { EventType, EventTypeSchema }=require('./eventType.model');
const { Contract, ContractSchema } = require('./contract.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Check.init(CheckSchema,Check.config(sequelize));
  Contract.init(ContractSchema, Contract.config(sequelize));
  Event.init(EventSchema,Event.config(sequelize));
  EventType.init(EventTypeSchema,EventType.config(sequelize));

  Employee.associate(sequelize.models);
  Check.associate(sequelize.models);
  Event.associate(sequelize.models);
  Contract.associate(sequelize.models);
}

module.exports = setupModels;