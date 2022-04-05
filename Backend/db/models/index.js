const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
//const { Check,CheckSchema }=require('./check.model');
const { Event,EventSchema }=require('./event.model');
const { EventType, EventTypeSchema }=require('./eventType.model');
const { RollType, RollTypeSchema }=require('./rollType.model');
const { WorkPlace, WorkPlaceSchema }=require('./workPlace.model');
const { Contract, ContractSchema } = require('./contract.model');
const { Schedule, ScheduleSchema } = require('./schedule.model');
const { EmployeeSchedule, EmployeeScheduleSchema } = require('./employeeSchedule.model');
const { Request, RequestSchema } = require('./request.model');
const { Status, StatusSchema } = require('./status.model');
const { RequestType, RequestTypeSchema } = require('./requestType.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  //Check.init(CheckSchema,Check.config(sequelize));
  Contract.init(ContractSchema, Contract.config(sequelize));
  Event.init(EventSchema,Event.config(sequelize));
  EventType.init(EventTypeSchema,EventType.config(sequelize));
  RollType.init(RollTypeSchema,RollType.config(sequelize));
  WorkPlace.init(WorkPlaceSchema,WorkPlace.config(sequelize));
  Schedule.init(ScheduleSchema,Schedule.config(sequelize));
  EmployeeSchedule.init(EmployeeScheduleSchema,EmployeeSchedule.config(sequelize));
  Request.init(RequestSchema,Request.config(sequelize));
  Status.init(StatusSchema,Status.config(sequelize));
  RequestType.init(RequestTypeSchema,RequestType.config(sequelize));

  Employee.associate(sequelize.models);
  User.associate(sequelize.models);
  Event.associate(sequelize.models);
  Contract.associate(sequelize.models);
  Request.associate(sequelize.models);

}

module.exports = setupModels;