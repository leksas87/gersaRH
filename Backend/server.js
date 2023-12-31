﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('middleware/error-handler');
require('dotenv').config();;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

global.__basedir = __dirname ;
// api routes
app.use('/api/users', require('./controllers/users.controller'));
app.use('/api/employees', require('./controllers/employees.controller'));
app.use('/api/contracts', require('./controllers/contracts.controller'));
app.use('/api/workPlaces', require('./controllers/workPlaces.controller'));
app.use('/api/event', require('./controllers/event.controller'));
app.use('/api/eventType', require('./controllers/eventType.controller'));
app.use('/api/schedules', require('./controllers/schedules.controller'));
app.use('/api/files', require('./controllers/files.controller'));
app.use('/api/payRolls', require('./controllers/payroll.controller'));
app.use('/api/hoursAccepted', require('./controllers/hourAccepted.controller'));
app.use('/api/availableDays', require('./controllers/availableDays.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server listening on port ' + port));