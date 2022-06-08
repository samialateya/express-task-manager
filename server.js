const express = require('express');
require('express-async-errors');
//import required middleware
const NotFoundMiddleware = require('./Middleware/NotFoundMiddleware');
const ErrorHandlerMiddleware = require('./Middleware/ErrorHandlerMiddleware');
//import .env to be able to use environment variables
require('dotenv').config();

//initiate the express app
const app = express();

/* ---------------------------- import the routes --------------------------- */
//*tasks routes
const tasksRouter = require('./Router/TasksRouter');
app.use('/tasks', tasksRouter);

/* ------------------------------- middleware ------------------------------- */
//*use not found ./Middleware/NotFoundMiddleware
app.use(NotFoundMiddleware);
//*use error middleware
app.use(ErrorHandlerMiddleware);


/* ---------------------------- start the server ---------------------------- */
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('listening on port'+port);
});