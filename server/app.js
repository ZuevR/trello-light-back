const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const cors = require('cors');


const authRoutes = require('./api/v1/routes/auth');
const boardRoutes = require('./api/v1/routes/boards');
const taskRoutes = require('./api/v1/routes/tasks');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((error, req, res, next) => {
  res.status(500).send(error);
});

module.exports = app;
