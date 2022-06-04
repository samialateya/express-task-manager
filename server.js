const express = require('express');
require('dotenv').config();
const app = express();

const tasksRouter = require('./Router/TasksRouter');

//register the router
app.use('/tasks', tasksRouter);

//start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('listening on port'+port);
});