const express = require('express');
//require .env to be able to use environment variables
require('dotenv').config();

//initiate the express app
const app = express();

//import the routes
const tasksRouter = require('./Router/TasksRouter');

//register the router
app.use('/tasks', tasksRouter);

//use not found middleware
app.use(require('./Middleware/NotFound'));

//start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('listening on port'+port);
});