const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Reports,ReportSchema }=require('./report.model');
const { Event,EventSchema }=require('./event.model');
const { EventType, EventTypeSchema }=require('./eventType.model');
const { RollType, RollTypeSchema }=require('./rollType.model');
const { WorkPlace, WorkPlaceSchema }=require('./workPlace.model');
const { Contract, ContractSchema } = require('./contract.model');
const { Schedule, ScheduleSchema } = require('./schedule.model');
const { EmployeeSchedule, EmployeeScheduleSchema } = require('./employeeSchedule.model');
const { Request, RequestSchema } = require('./request.model');
const { TimeRequest, TimeRequestSchema } = require('./timeRequest.model');
const { Status, StatusSchema } = require('./status.model');
const { RequestType, RequestTypeSchema } = require('./requestType.model');
const { EventActionType, EventActionTypeSchema } = require('./eventActionType.model');
const { File, FileSchema } = require('./file.model');
const { Payroll, PayrollSchema } = require('./payRoll.model');
const { DocumentType, DocumentTypeSchema } = require('./documentType.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Reports.init(ReportSchema,Reports.config(sequelize));
  Contract.init(ContractSchema, Contract.config(sequelize));
  Event.init(EventSchema,Event.config(sequelize));
  EventType.init(EventTypeSchema,EventType.config(sequelize));
  RollType.init(RollTypeSchema,RollType.config(sequelize));
  WorkPlace.init(WorkPlaceSchema,WorkPlace.config(sequelize));
  Schedule.init(ScheduleSchema,Schedule.config(sequelize));
  EmployeeSchedule.init(EmployeeScheduleSchema,EmployeeSchedule.config(sequelize));
  Request.init(RequestSchema,Request.config(sequelize));
  TimeRequest.init(TimeRequestSchema,TimeRequest.config(sequelize));
  Status.init(StatusSchema,Status.config(sequelize));
  RequestType.init(RequestTypeSchema,RequestType.config(sequelize));
  EventActionType.init(EventActionTypeSchema,EventActionType.config(sequelize));
  File.init(FileSchema,File.config(sequelize));
  Payroll.init(PayrollSchema,Payroll.config(sequelize));
  DocumentType.init(DocumentTypeSchema,DocumentType.config(sequelize));

  Employee.associate(sequelize.models);
  User.associate(sequelize.models);
  Event.associate(sequelize.models);
  Contract.associate(sequelize.models);
  Request.associate(sequelize.models);
  TimeRequest.associate(sequelize.models);
  Reports.associate(sequelize.models);
  File.associate(sequelize.models);
  Payroll.associate(sequelize.models);

}

module.exports = setupModels;